import { Router } from 'express';
import validateRequest from '../utils/validateRequest';
import {
  loginValidationSchema,
  refreshTokenValidationSchema,
} from './auth.validation';
import { authControllers } from './auth.controller';

const router = Router();

router.post(
  '/signin',
  validateRequest(loginValidationSchema),
  authControllers.loginUser,
);

router.post(
  '/refresh-token',
  validateRequest(refreshTokenValidationSchema),
  authControllers.refreshToken,
);

export const AuthRoutes = router;
