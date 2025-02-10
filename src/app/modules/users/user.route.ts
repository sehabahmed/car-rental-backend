import express from 'express';
import { userControllers } from './user.controller';
import { createUserValidationSchema, updateUserValidationSchema } from './user.validation';
import validateRequest from '../utils/validateRequest';

const router = express.Router();

router.post(
  '/create-user',
  validateRequest(createUserValidationSchema),
  userControllers.createUser,
);

router.get('/', userControllers.getAllUsers);

router.get('/:id', userControllers.getSingleUser);

router.patch('/:id', validateRequest(updateUserValidationSchema),  userControllers.updateUser);

router.delete('/:id', userControllers.deleteUser);

export const userRoutes = router;
