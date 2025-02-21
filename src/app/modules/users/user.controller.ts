import { tuple } from 'zod';
import AppError from '../../errors/AppError';
import catchAsync from '../utils/catchAsync';
import sendResponse from '../utils/sendResponse';
import { userServices } from './user.service';
import httpStatus from 'http-status';

const signup = catchAsync(async (req, res) => {
  const { password, user: userData } = req.body;

  const result = await userServices.signupUserIntoDB(password, userData);

  if (!result) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create User!');
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User is created Successfully',
    data: result,
  });
});

const getAllUsers = catchAsync(async (req, res) => {
  const result = await userServices.getAllUsers();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User Retreive Successfully',
    data: result,
  });
});

const getSingleUser = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await userServices.getSingleUser(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Single User Retreive Successfully',
    data: result,
  });
});

const updateUser = catchAsync(async (req, res) => {
  const { id } = req.params;
  const updateUserData = req.body;

  const result = await userServices.updateUser(id, updateUserData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User Updated Successfully',
    data: result,
  });
});

const deleteUser = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await userServices.deleteUser(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Deleted User Successfully',
    data: result,
  });
});

export const userControllers = {
  signup,
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
};
