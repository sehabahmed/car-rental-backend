import { Router } from 'express';
import validateRequest from '../utils/validateRequest';
import { loginValidationSchema } from './auth.validation';
import { authControllers } from './auth.controller';

const router = Router();

router.post(
  '/login',
  validateRequest(loginValidationSchema),
  authControllers.loginUser,
);


export const AuthRoutes = router;