import { NextFunction, Request, Response } from 'express';
import { TUserRole } from '../modules/users/user.interface';
import catchAsync from '../modules/utils/catchAsync';
import AppError from '../errors/AppError';
import httpStatus from 'http-status';

const auth = async (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    if (!token) {
      throw new AppError(httpStatus.NOT_FOUND, 'You are not Authorized!');
    }

    
  });
};
