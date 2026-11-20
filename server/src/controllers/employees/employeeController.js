import { Employee } from '../../models/Employee.js';
import { Department } from '../../models/Department.js';
import { Role } from '../../models/Role.js';
import { UserAccount } from '../../models/UserAccount.js';
import { getNextSequence } from '../../utils/counter.js';
import { sendSuccess } from '../../utils/response.js';
import { ApiError } from '../../utils/apiError.js';
import { buildIdOrCodeQuery } from '../../utils/queryHelper.js';

export async function getEmployees(req, res, next) {
  try {
    const { department, status, search } = req.query;
    const filter = {};
    if (department) filter.department = department;
    if (status) filter.status = status;
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { code: { $regex: search, $options: 'i' } },
        { designation: { $regex: search, $options: 'i' } }
      ];
    }
    const employees = await Employee.find(filter).populate('reportingManager', 'name code').sort({ name: 1 });
    return sendSuccess(res, employees);
  } catch (err) {
    return next(err);
  }
}

export async function createEmployee(req, res, next) {
  try {
    const data = { ...req.body };
    if (!data.code) {
      data.code = await getNextSequence('EMP', 3);
    }
    const employee = await Employee.create(data);
    await Department.findOneAndUpdate({ code: data.department }, { $inc: { activeEmployeeCount: 1 } });
    return sendSuccess(res, employee, 'Employee created successfully', 201);
  } catch (err) {
    return next(err);
  }
}

export async function getEmployeeById(req, res, next) {
  try {
    const employee = await Employee.findOne(buildIdOrCodeQuery(req.params.id));
    if (!employee) return next(ApiError.notFound('Employee not found'));
    return sendSuccess(res, employee);
  } catch (err) {
    return next(err);
  }
}

export async function updateEmployee(req, res, next) {
  try {
    const employee = await Employee.findOneAndUpdate(
      buildIdOrCodeQuery(req.params.id),
      req.body,
      { new: true, runValidators: true }
    );
    if (!employee) return next(ApiError.notFound('Employee not found'));
    return sendSuccess(res, employee, 'Employee updated successfully');
  } catch (err) {
    return next(err);
  }
}

export async function getDepartments(_req, res, next) {
  try {
    const departments = await Department.find({ status: 'Active' }).sort({ name: 1 });
    return sendSuccess(res, departments);
  } catch (err) {
    return next(err);
  }
}

export async function getRoles(_req, res, next) {
  try {
    const roles = await Role.find().sort({ department: 1, name: 1 });
    return sendSuccess(res, roles);
  } catch (err) {
    return next(err);
  }
}

export async function getUserAccounts(_req, res, next) {
  try {
    const users = await UserAccount.find()
      .populate('employeeId', 'code name designation department')
      .select('-passwordHash -refreshTokenHash')
      .sort({ createdAt: -1 });
    return sendSuccess(res, users);
  } catch (err) {
    return next(err);
  }
}

export async function createUserAccount(req, res, next) {
  try {
    const { username, email, password, employeeId, role, isAdmin, departments, permissions } = req.body;
    const existing = await UserAccount.findOne({ $or: [{ email: email.toLowerCase() }, { username }] });
    if (existing) {
      return next(ApiError.conflict('Username or email already in use'));
    }

    const passwordHash = await UserAccount.hashPassword(password);
    const user = await UserAccount.create({
      username,
      email: email.toLowerCase(),
      passwordHash,
      employeeId: employeeId || null,
      role,
      isAdmin: Boolean(isAdmin),
      departments: departments || [],
      permissions: permissions || {}
    });

    return sendSuccess(res, {
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      isAdmin: user.isAdmin,
      departments: user.departments
    }, 'User account created successfully', 201);
  } catch (err) {
    return next(err);
  }
}

export async function updateUserPermissions(req, res, next) {
  try {
    const { departments, permissions } = req.body;
    const update = {};
    if (departments) update.departments = departments;
    if (permissions) update.permissions = permissions;

    const user = await UserAccount.findByIdAndUpdate(req.params.id, update, { new: true })
      .select('-passwordHash -refreshTokenHash');

    if (!user) return next(ApiError.notFound('User account not found'));
    return sendSuccess(res, user, 'User permissions updated');
  } catch (err) {
    return next(err);
  }
}
