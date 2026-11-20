import { ApiError } from '../utils/apiError.js';

export function requireAdmin(req, _res, next) {
  if (!req.user) {
    return next(ApiError.unauthorized());
  }
  if (!req.user.isAdmin) {
    return next(ApiError.forbidden('Administrative privileges required'));
  }
  return next();
}

export function requireDept(deptKey) {
  return (req, _res, next) => {
    if (!req.user) {
      return next(ApiError.unauthorized());
    }
    if (req.user.isAdmin) {
      return next();
    }
    if (Array.isArray(req.user.departments) && req.user.departments.includes(deptKey)) {
      return next();
    }
    return next(ApiError.forbidden(`Access to the ${deptKey} department is not permitted for your role`));
  };
}

export function requireAction(deptKey, action = 'view') {
  return (req, _res, next) => {
    if (!req.user) {
      return next(ApiError.unauthorized());
    }
    if (req.user.isAdmin) {
      return next();
    }
    // Check department membership
    if (!Array.isArray(req.user.departments) || !req.user.departments.includes(deptKey)) {
      return next(ApiError.forbidden(`Access to the ${deptKey} department is not permitted`));
    }
    // Check specific action flag
    const deptPerms = req.user.permissions?.[deptKey];
    if (deptPerms && deptPerms[action] === true) {
      return next();
    }
    return next(ApiError.forbidden(`Permission denied: '${action}' action in ${deptKey} is restricted`));
  };
}
