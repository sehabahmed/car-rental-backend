import catchAsync from '../utils/catchAsync';
import sendResponse from '../utils/sendResponse';
import { authServices } from './auth.service';
import httpStatus from 'http-status';
import config from '../../index';

const loginUser = catchAsync(async (req, res) => {
  const result = await authServices.loginUser(req.body);

  const { token, refreshToken } = result;

  res.cookie('refreshToken', refreshToken, {
    secure: config.NODE_ENV === 'production',
    httpOnly: true,
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User Logged in Successfully',
    data: { token, refreshToken },
  });
});

const refreshToken = catchAsync(async (req, res) => {
  const { refreshToken } = req.cookies;

  const result = await authServices.refreshToken(refreshToken);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Refresh Token is retrieve Successfully',
    data: result,
  });
});

export const authControllers = {
  loginUser,
  refreshToken,
};
