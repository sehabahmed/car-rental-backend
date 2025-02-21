import { TUpdateUser, TUser } from './user.interface';
import config from '../../index';
import { User } from './user.model';

const signupUserIntoDB = async (password: string, payload: TUser) => {
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
  signupUserIntoDB,
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
};
