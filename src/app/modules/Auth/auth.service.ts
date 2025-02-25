import AppError from '../../errors/AppError';
import { User } from '../users/user.model';
import { TLoginUser } from './auth.interface';
import httpStatus from 'http-status';
import { createToken, extractToken } from './auth.utils';
import config from '../../index';
import jwt, { JwtPayload } from 'jsonwebtoken';

const loginUser = async (payload: TLoginUser) => {
  //check if user is not found
  const user = await User.isUserExistsByEmail(payload.email);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User Not Found');
  }

  //check if password is correct

  const isPasswordMatched = await User.isPasswordMatched(
    payload?.password,
    user?.password,
  );

  if (!isPasswordMatched) {
    throw new AppError(httpStatus.FORBIDDEN, 'Password does not matched!');
  }

  const userData = await User.findOne({ email: payload.email }).lean();

  const jwtPayload = {
    userEmail: user.email,
    role: user.role as string,
  };

  const token = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
     config.jwt_access_expires_in as string,
  );

  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string,
  );

  return { user: userData, token, refreshToken };
};

//Refresh Token

const refreshToken = async (token: string) => {
  if (!token) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'Invalid Refresh Token');
  }

  const rawToken = extractToken(token);

  if (!rawToken) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'Invalid Refresh Token Format');
  }

  //check if the given token is valid

  const decoded = jwt.verify(
    token,
    config.jwt_refresh_secret as string,
  ) as JwtPayload;

  const { userEmail } = decoded;

  //check if user is not found
  const user = await User.isUserExistsByEmail(userEmail);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User Not Found');
  }

  const jwtPayload = {
    userEmail: user.email,
    role: user.role as string,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  return { accessToken };
};

export const authServices = {
  loginUser,
  refreshToken,
};
