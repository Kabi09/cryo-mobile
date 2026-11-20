import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
import { ApiError } from '../utils/apiError.js';
import { UserAccount } from '../models/UserAccount.js';

export async function authenticate(req, _res, next) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return next(ApiError.unauthorized('Authentication token missing or malformed'));
    }

    const token = authHeader.split(' ')[1];
    let decoded;
    try {
      decoded = jwt.verify(token, env.jwtSecret);
    } catch (err) {
      return next(ApiError.unauthorized(err.name === 'TokenExpiredError' ? 'Token expired' : 'Invalid token'));
    }

    const user = await UserAccount.findById(decoded.id)
      .populate('employeeId')
      .lean();

    if (!user) {
      return next(ApiError.unauthorized('User account no longer exists'));
    }

    if (user.status !== 'Active') {
      return next(ApiError.forbidden('User account is inactive or suspended'));
    }

    req.user = {
      id: user._id.toString(),
      email: user.email,
      username: user.username,
      employeeId: user.employeeId?._id?.toString() || null,
      employeeCode: user.employeeId?.code || null,
      employeeName: user.employeeId?.name || user.username,
      role: user.role,
      isAdmin: user.isAdmin,
      departments: user.departments || [],
      permissions: user.permissions || {}
    };

    return next();
  } catch (error) {
    return next(error);
  }
}
