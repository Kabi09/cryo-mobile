import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { UserAccount } from '../../models/UserAccount.js';
import { env } from '../../config/env.js';
import { ApiError } from '../../utils/apiError.js';
import { sendSuccess } from '../../utils/response.js';

function generateTokens(user) {
  const payload = {
    id: user._id.toString(),
    email: user.email,
    username: user.username,
    role: user.role,
    isAdmin: user.isAdmin,
    departments: user.departments || []
  };

  const accessToken = jwt.sign(payload, env.jwtSecret, { expiresIn: env.jwtExpiresIn });
  const refreshToken = jwt.sign({ id: user._id.toString() }, env.jwtRefreshSecret, { expiresIn: env.jwtRefreshExpiresIn });

  return { accessToken, refreshToken };
}

export async function login(req, res, next) {
  try {
    const { email, password } = req.body;

    const user = await UserAccount.findOne({ email: email.toLowerCase() }).populate('employeeId');
    if (!user) {
      return next(ApiError.unauthorized('Invalid email or password'));
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return next(ApiError.unauthorized('Invalid email or password'));
    }

    if (user.status !== 'Active') {
      return next(ApiError.forbidden('User account is suspended or inactive'));
    }

    const { accessToken, refreshToken } = generateTokens(user);

    // Store hash of refresh token
    const salt = await bcrypt.genSalt(10);
    user.refreshTokenHash = await bcrypt.hash(refreshToken, salt);
    user.lastLoginAt = new Date();
    await user.save();

    const userData = {
      id: user._id.toString(),
      email: user.email,
      username: user.username,
      role: user.role,
      isAdmin: user.isAdmin,
      departments: user.departments,
      permissions: user.permissions,
      employee: user.employeeId ? {
        id: user.employeeId._id,
        code: user.employeeId.code,
        name: user.employeeId.name,
        designation: user.employeeId.designation,
        department: user.employeeId.department
      } : null
    };

    return sendSuccess(res, {
      user: userData,
      accessToken,
      refreshToken
    }, 'Authentication successful');
  } catch (error) {
    return next(error);
  }
}

export async function refresh(req, res, next) {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      return next(ApiError.badRequest('Refresh token is required'));
    }

    let decoded;
    try {
      decoded = jwt.verify(refreshToken, env.jwtRefreshSecret);
    } catch (_err) {
      return next(ApiError.unauthorized('Invalid or expired refresh token'));
    }

    const user = await UserAccount.findById(decoded.id).populate('employeeId');
    if (!user || !user.refreshTokenHash) {
      return next(ApiError.unauthorized('Session expired or invalidated'));
    }

    const isMatch = await bcrypt.compare(refreshToken, user.refreshTokenHash);
    if (!isMatch) {
      return next(ApiError.unauthorized('Invalid refresh token'));
    }

    const tokens = generateTokens(user);

    const salt = await bcrypt.genSalt(10);
    user.refreshTokenHash = await bcrypt.hash(tokens.refreshToken, salt);
    await user.save();

    return sendSuccess(res, tokens, 'Token refreshed successfully');
  } catch (error) {
    return next(error);
  }
}

export async function logout(req, res, next) {
  try {
    if (req.user?.id) {
      await UserAccount.findByIdAndUpdate(req.user.id, { refreshTokenHash: null });
    }
    return sendSuccess(res, null, 'Logged out successfully');
  } catch (error) {
    return next(error);
  }
}

export async function getMe(req, res, next) {
  try {
    const user = await UserAccount.findById(req.user.id).populate('employeeId');
    if (!user) {
      return next(ApiError.notFound('User not found'));
    }

    const userData = {
      id: user._id.toString(),
      email: user.email,
      username: user.username,
      role: user.role,
      isAdmin: user.isAdmin,
      departments: user.departments,
      permissions: user.permissions,
      employee: user.employeeId ? {
        id: user.employeeId._id,
        code: user.employeeId.code,
        name: user.employeeId.name,
        designation: user.employeeId.designation,
        department: user.employeeId.department
      } : null
    };

    return sendSuccess(res, userData, 'User profile retrieved');
  } catch (error) {
    return next(error);
  }
}

export async function changePassword(req, res, next) {
  try {
    const { currentPassword, newPassword } = req.body;
    const user = await UserAccount.findById(req.user.id);

    const isMatch = await user.comparePassword(currentPassword);
    if (!isMatch) {
      return next(ApiError.badRequest('Current password is incorrect'));
    }

    user.passwordHash = await UserAccount.hashPassword(newPassword);
    user.refreshTokenHash = null; // force re-login on all devices
    await user.save();

    return sendSuccess(res, null, 'Password updated successfully. Please re-authenticate.');
  } catch (error) {
    return next(error);
  }
}

export async function resetPassword(req, res, next) {
  try {
    const { userId, newPassword } = req.body;
    const user = await UserAccount.findById(userId);
    if (!user) {
      return next(ApiError.notFound('Target user not found'));
    }

    user.passwordHash = await UserAccount.hashPassword(newPassword);
    user.refreshTokenHash = null;
    await user.save();

    return sendSuccess(res, null, `Password for ${user.username} has been reset.`);
  } catch (error) {
    return next(error);
  }
}
