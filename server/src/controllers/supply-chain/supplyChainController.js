import { PurchaseOrder } from '../../models/PurchaseOrder.js';
import { GoodsReceiptNote } from '../../models/GoodsReceiptNote.js';
import { MaterialIssue } from '../../models/MaterialIssue.js';
import { MaterialRequest } from '../../models/MaterialRequest.js';
import { Material } from '../../models/Material.js';
import { StockMovement } from '../../models/StockMovement.js';
import { StockAdjustment } from '../../models/StockAdjustment.js';
import { SalesOrder } from '../../models/SalesOrder.js';
import { AuditLog } from '../../models/AuditLog.js';
import { getNextSequence } from '../../utils/counter.js';
import { sendSuccess } from '../../utils/response.js';
import { ApiError } from '../../utils/apiError.js';
import { buildIdOrCodeQuery } from '../../utils/queryHelper.js';

// --- PURCHASE ORDERS ---
export async function getPurchaseOrders(req, res, next) {
  try {
    const { status, supplier } = req.query;
    const filter = {};
    if (status) filter.status = status;
    if (supplier) filter.supplierName = { $regex: supplier, $options: 'i' };
    const orders = await PurchaseOrder.find(filter).sort({ createdAt: -1 });
    return sendSuccess(res, orders);
  } catch (err) {
    return next(err);
  }
}

export async function createPurchaseOrder(req, res, next) {
  try {
    const code = await getNextSequence('PO', 3);
    const po = await PurchaseOrder.create({
      ...req.body,
      code,
      status: 'Issued to Supplier'
    });

    await AuditLog.create({
      action: 'CREATE_PURCHASE_ORDER',
      department: 'supply-chain',
      resource: 'PurchaseOrder',
      resourceId: code,
      userName: req.user?.employeeName || 'Stores Manager',
      details: { supplierName: po.supplierName, totalAmount: po.totalAmount }
    });

    // Advance SalesOrder stage to 16
    if (po.materialRequestCode) {
      await SalesOrder.findOneAndUpdate(
        {},
        { completedStageNum: 16 }
      );
    }

    return sendSuccess(res, po, 'Purchase Order issued to supplier. Inventory unchanged until GRN.', 201);
  } catch (err) {
    return next(err);
  }
}

export async function getPurchaseOrderById(req, res, next) {
  try {
    const po = await PurchaseOrder.findOne(buildIdOrCodeQuery(req.params.id));
    if (!po) return next(ApiError.notFound('Purchase Order not found'));
    return sendSuccess(res, po);
  } catch (err) {
    return next(err);
  }
}

// --- GOODS RECEIPT NOTE (GRN) ---
export async function getGRNs(_req, res, next) {
  try {
    const grns = await GoodsReceiptNote.find().sort({ createdAt: -1 });
    return sendSuccess(res, grns);
  } catch (err) {
    return next(err);
  }
}

export async function createGRN(req, res, next) {
  try {
    const code = await getNextSequence('GRN', 3);
    const { purchaseOrderCode, items } = req.body;

    const grn = await GoodsReceiptNote.create({
      ...req.body,
      code,
      receivedBy: req.user?.employeeName || 'Stores Receiving',
      status: 'Accepted into Stock'
    });

    // Update warehouse stock atomically for accepted items
    for (const item of items) {
      if (item.acceptedQty > 0) {
        const material = await Material.findOneAndUpdate(
          { code: item.materialCode },
          { $inc: { currentStock: item.acceptedQty } },
          { new: true }
        );

        const newStock = material ? material.currentStock : item.acceptedQty;

        await StockMovement.create({
          materialCode: item.materialCode,
          materialName: item.materialName,
          movementType: 'GRN_RECEIPT',
          quantity: item.acceptedQty,
          balanceAfter: newStock,
          referenceDoc: code,
          performedBy: req.user?.employeeName || 'Stores Receiving',
          notes: `GRN Acceptance from PO ${purchaseOrderCode}`
        });
      }
    }

    // Mark PO delivered
    await PurchaseOrder.findOneAndUpdate(
      { code: purchaseOrderCode },
      { status: 'Delivered (GRN Confirmed)' }
    );

    // Advance SalesOrder stage to 17
    await SalesOrder.findOneAndUpdate(
      {},
      { completedStageNum: 17 }
    );

    await AuditLog.create({
      action: 'ACCEPT_GRN',
      department: 'supply-chain',
      resource: 'GoodsReceiptNote',
      resourceId: code,
      userName: req.user?.employeeName || 'Stores Receiving',
      details: { purchaseOrderCode, itemsAccepted: items.map(i => `${i.materialCode}: ${i.acceptedQty}`) }
    });

    return sendSuccess(res, grn, 'Goods Receipt Note verified and inventory incremented atomically', 201);
  } catch (err) {
    return next(err);
  }
}

// --- MATERIAL ISSUE ---
export async function getMaterialIssues(_req, res, next) {
  try {
    const issues = await MaterialIssue.find().sort({ createdAt: -1 });
    return sendSuccess(res, issues);
  } catch (err) {
    return next(err);
  }
}

export async function createMaterialIssue(req, res, next) {
  try {
    const { materialRequestCode, items, issueType } = req.body;

    // Strict validation: Verify inventory availability BEFORE modifying stock
    for (const item of items) {
      const material = await Material.findOne({ code: item.materialCode });
      if (!material) {
        return next(ApiError.badRequest(`Material not found in database: ${item.materialCode}`));
      }
      if (material.currentStock < item.quantityIssued) {
        return next(ApiError.badRequest(
          `Insufficient stock for ${item.materialName} (${item.materialCode}). Available: ${material.currentStock}, Requested: ${item.quantityIssued}`
        ));
      }
    }

    const code = await getNextSequence('MI', 3);

    // Atomically decrement stock and record movements
    for (const item of items) {
      const updated = await Material.findOneAndUpdate(
        { code: item.materialCode },
        { $inc: { currentStock: -item.quantityIssued } },
        { new: true }
      );

      await StockMovement.create({
        materialCode: item.materialCode,
        materialName: item.materialName,
        movementType: 'MATERIAL_ISSUE',
        quantity: -item.quantityIssued,
        balanceAfter: updated.currentStock,
        referenceDoc: code,
        performedBy: req.user?.employeeName || 'Stores Incharge',
        notes: `${issueType} for Requisition ${materialRequestCode}`
      });
    }

    const issue = await MaterialIssue.create({
      ...req.body,
      code,
      issuedBy: req.user?.employeeName || 'Stores Incharge',
      status: 'Issued'
    });

    // Update MaterialRequest issued quantities and overall status
    const mr = await MaterialRequest.findOne({ code: materialRequestCode });
    if (mr) {
      for (const item of items) {
        const mrItem = mr.items.find(i => i.materialCode === item.materialCode);
        if (mrItem) {
          mrItem.issuedQty = (mrItem.issuedQty || 0) + item.quantityIssued;
        }
      }
      const allFulfilled = mr.items.every(i => i.issuedQty >= i.requiredQty);
      mr.status = allFulfilled ? 'Fully Issued' : 'Partially Issued';
      await mr.save();

      // Advance SalesOrder stage (15 for partial, 18 for full)
      const stageNum = allFulfilled ? 18 : 15;
      await SalesOrder.findOneAndUpdate({}, { completedStageNum: stageNum });
    }

    await AuditLog.create({
      action: 'MATERIAL_ISSUE',
      department: 'supply-chain',
      resource: 'MaterialIssue',
      resourceId: code,
      userName: req.user?.employeeName || 'Stores Incharge',
      details: { materialRequestCode, issueType, itemsIssued: items.map(i => `${i.materialCode}: -${i.quantityIssued}`) }
    });

    return sendSuccess(res, issue, `${issueType} confirmed and warehouse stock deducted atomically`, 201);
  } catch (err) {
    return next(err);
  }
}

// --- STOCK ADJUSTMENT ---
export async function createStockAdjustment(req, res, next) {
  try {
    const { materialCode, adjustedStock, reason } = req.body;
    const material = await Material.findOne({ code: materialCode });
    if (!material) return next(ApiError.notFound('Material not found'));

    const code = await getNextSequence('ADJ', 3);
    const previousStock = material.currentStock;
    const variance = adjustedStock - previousStock;

    material.currentStock = adjustedStock;
    await material.save();

    const adj = await StockAdjustment.create({
      code,
      materialCode,
      materialName: material.name,
      previousStock,
      adjustedStock,
      variance,
      reason,
      authorizedBy: req.user?.employeeName || 'Inventory Controller'
    });

    await StockMovement.create({
      materialCode,
      materialName: material.name,
      movementType: 'ADJUSTMENT',
      quantity: variance,
      balanceAfter: adjustedStock,
      referenceDoc: code,
      performedBy: req.user?.employeeName || 'Inventory Controller',
      notes: reason
    });

    return sendSuccess(res, adj, 'Stock level adjusted and ledger audit entry recorded', 201);
  } catch (err) {
    return next(err);
  }
}

// --- STOCK MOVEMENTS LEDGER ---
export async function getStockMovements(req, res, next) {
  try {
    const { materialCode } = req.query;
    const filter = materialCode ? { materialCode } : {};
    const movements = await StockMovement.find(filter).sort({ createdAt: -1 }).limit(100);
    return sendSuccess(res, movements);
  } catch (err) {
    return next(err);
  }
}
