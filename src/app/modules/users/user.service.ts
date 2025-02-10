import { TUpdateUser, TUser } from './user.interface';
import config from '../../index';
// import mongoose from 'mongoose';
// import { generateAdminid, generateUserId } from './user.utils';
import { User } from './user.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';

// const createUserIntoDB = async (password: string, payload: TUser) => {
//   //create a new user object

//   const userData: Partial<TUser> = {...payload};

//   //if password not given, use default password

//   userData.password = password || (config.default_password as string);

//   //set user role
//   userData.role = 'user';

//   const session = await mongoose.startSession();

//   try {
//     session.startTransaction();

//     //set Generated ID
//     userData.id = await generateUserId();

//     //create a user (transaction)
//     const newUser = await User.create([userData], { session });

//     //create an user
//     if (!newUser.length) {
//       throw new AppError(httpStatus.BAD_REQUEST, 'Falied to create User');
//     }

//     //set Id

//     payload.id = newUser[0].id;

//     await session.commitTransaction();
//     await session.endSession();

//     return newUser[0];
//   } catch (err: any) {
//     await session.abortTransaction();
//     await session.endSession();
//     throw new Error(err);
//   }
// };

const createUserIntoDB = async (password: string, payload: TUser) => {
  payload.password = password || (config.default_password as string);

  const result = await User.create(payload);

  return result;
};

const getAllUsers = async () => {
  const result = await User.find();

  return result;
};

const getSingleUser = async (id: string) => {
  const result = await User.findById(id);

  return result;
};

const updateUser = async (id: string, payload: TUpdateUser) => {
  const userData = payload.user;

  const result = await User.findByIdAndUpdate(id, userData, {
    new: true,
    runValidators: true,
  });

  return result;
};

const deleteUser = async (id: string) => {
  const result = await User.findByIdAndDelete(id);

  return result;
};

export const userServices = {
  createUserIntoDB,
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser
};
