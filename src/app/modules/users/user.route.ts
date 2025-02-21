import express from 'express';
import { userControllers } from './user.controller';
import { signupUserValidationSchema, updateUserValidationSchema } from './user.validation';
import validateRequest from '../utils/validateRequest';
import auth from '../../middleware/auth';
import { USER_ROLE } from './user.constant';

const router = express.Router();

router.post(
  '/signup',
  
  validateRequest(signupUserValidationSchema),
  userControllers.signup,
);

router.get('/', auth(USER_ROLE.user, USER_ROLE.admin), userControllers.getAllUsers);

router.get('/:id', userControllers.getSingleUser);

router.patch('/:id', validateRequest(updateUserValidationSchema),  userControllers.updateUser);

router.delete('/:id', userControllers.deleteUser);

export const userRoutes = router;
