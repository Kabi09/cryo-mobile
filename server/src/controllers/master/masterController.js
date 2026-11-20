import { Customer } from '../../models/Customer.js';
import { Product } from '../../models/Product.js';
import { Material } from '../../models/Material.js';
import { Supplier } from '../../models/Supplier.js';
import { Vehicle } from '../../models/Vehicle.js';
import { CourierProvider } from '../../models/CourierProvider.js';
import { getNextSequence } from '../../utils/counter.js';
import { sendSuccess } from '../../utils/response.js';
import { ApiError } from '../../utils/apiError.js';
import { buildIdOrCodeQuery } from '../../utils/queryHelper.js';

// --- CUSTOMERS ---
export async function getCustomers(req, res, next) {
  try {
    const { search, status } = req.query;
    const filter = {};
    if (status) filter.status = status;
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { code: { $regex: search, $options: 'i' } },
        { city: { $regex: search, $options: 'i' } }
      ];
    }
    const customers = await Customer.find(filter).sort({ createdAt: -1 });
    return sendSuccess(res, customers);
  } catch (err) {
    return next(err);
  }
}

export async function createCustomer(req, res, next) {
  try {
    const data = { ...req.body };
    if (!data.code) {
      data.code = await getNextSequence('CUST', 3);
    }
    const customer = await Customer.create(data);
    return sendSuccess(res, customer, 'Customer created successfully', 201);
  } catch (err) {
    return next(err);
  }
}

export async function getCustomerById(req, res, next) {
  try {
    const customer = await Customer.findOne(buildIdOrCodeQuery(req.params.id));
    if (!customer) return next(ApiError.notFound('Customer not found'));
    return sendSuccess(res, customer);
  } catch (err) {
    return next(err);
  }
}

export async function updateCustomer(req, res, next) {
  try {
    const customer = await Customer.findOneAndUpdate(
      buildIdOrCodeQuery(req.params.id),
      req.body,
      { new: true, runValidators: true }
    );
    if (!customer) return next(ApiError.notFound('Customer not found'));
    return sendSuccess(res, customer, 'Customer updated successfully');
  } catch (err) {
    return next(err);
  }
}

// --- PRODUCTS ---
export async function getProducts(req, res, next) {
  try {
    const { search, category, status } = req.query;
    const filter = {};
    if (status) filter.status = status;
    if (category) filter.category = category;
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { sku: { $regex: search, $options: 'i' } },
        { model: { $regex: search, $options: 'i' } }
      ];
    }
    const products = await Product.find(filter).sort({ createdAt: -1 });
    return sendSuccess(res, products);
  } catch (err) {
    return next(err);
  }
}

export async function createProduct(req, res, next) {
  try {
    const data = { ...req.body };
    if (!data.code) {
      data.code = await getNextSequence('PRD', 3);
    }
    const product = await Product.create(data);
    return sendSuccess(res, product, 'Product created successfully', 201);
  } catch (err) {
    return next(err);
  }
}

export async function getProductById(req, res, next) {
  try {
    const product = await Product.findOne(buildIdOrCodeQuery(req.params.id));
    if (!product) return next(ApiError.notFound('Product not found'));
    return sendSuccess(res, product);
  } catch (err) {
    return next(err);
  }
}

export async function updateProduct(req, res, next) {
  try {
    const product = await Product.findOneAndUpdate(
      buildIdOrCodeQuery(req.params.id),
      req.body,
      { new: true, runValidators: true }
    );
    if (!product) return next(ApiError.notFound('Product not found'));
    return sendSuccess(res, product, 'Product updated successfully');
  } catch (err) {
    return next(err);
  }
}

// --- MATERIALS ---
export async function getMaterials(req, res, next) {
  try {
    const { search, category, lowStock } = req.query;
    const filter = {};
    if (category) filter.category = category;
    if (lowStock === 'true') {
      filter.$expr = { $lte: ['$currentStock', '$minStock'] };
    }
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { code: { $regex: search, $options: 'i' } }
      ];
    }
    const materials = await Material.find(filter).sort({ name: 1 });
    return sendSuccess(res, materials);
  } catch (err) {
    return next(err);
  }
}

export async function createMaterial(req, res, next) {
  try {
    const material = await Material.create(req.body);
    return sendSuccess(res, material, 'Material registered successfully', 201);
  } catch (err) {
    return next(err);
  }
}

export async function getMaterialById(req, res, next) {
  try {
    const material = await Material.findOne(buildIdOrCodeQuery(req.params.id));
    if (!material) return next(ApiError.notFound('Material not found'));
    return sendSuccess(res, material);
  } catch (err) {
    return next(err);
  }
}

export async function updateMaterial(req, res, next) {
  try {
    const material = await Material.findOneAndUpdate(
      buildIdOrCodeQuery(req.params.id),
      req.body,
      { new: true, runValidators: true }
    );
    if (!material) return next(ApiError.notFound('Material not found'));
    return sendSuccess(res, material, 'Material updated successfully');
  } catch (err) {
    return next(err);
  }
}

// --- SUPPLIERS ---
export async function getSuppliers(req, res, next) {
  try {
    const suppliers = await Supplier.find().sort({ name: 1 });
    return sendSuccess(res, suppliers);
  } catch (err) {
    return next(err);
  }
}

export async function createSupplier(req, res, next) {
  try {
    const data = { ...req.body };
    if (!data.code) {
      data.code = await getNextSequence('SUP', 2);
    }
    const supplier = await Supplier.create(data);
    return sendSuccess(res, supplier, 'Supplier created successfully', 201);
  } catch (err) {
    return next(err);
  }
}

// --- VEHICLES & COURIERS ---
export async function getVehicles(req, res, next) {
  try {
    const vehicles = await Vehicle.find().sort({ regNumber: 1 });
    return sendSuccess(res, vehicles);
  } catch (err) {
    return next(err);
  }
}

export async function createVehicle(req, res, next) {
  try {
    const data = { ...req.body };
    if (!data.code) {
      data.code = await getNextSequence('VEH', 2);
    }
    const vehicle = await Vehicle.create(data);
    return sendSuccess(res, vehicle, 'Vehicle registered successfully', 201);
  } catch (err) {
    return next(err);
  }
}

export async function getCourierProviders(req, res, next) {
  try {
    const couriers = await CourierProvider.find().sort({ name: 1 });
    return sendSuccess(res, couriers);
  } catch (err) {
    return next(err);
  }
}

export async function createCourierProvider(req, res, next) {
  try {
    const data = { ...req.body };
    if (!data.code) {
      data.code = await getNextSequence('PROV', 2);
    }
    const courier = await CourierProvider.create(data);
    return sendSuccess(res, courier, 'Courier provider registered successfully', 201);
  } catch (err) {
    return next(err);
  }
}
