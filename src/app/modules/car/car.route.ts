import { Router } from 'express';
import validateRequest from '../utils/validateRequest';
import {
  createCarValidationSchema,
  updateCarValidationSchema,
} from './car.validation';
import { CarControllers } from './car.controller';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../users/user.constant';

const router = Router();

router.post(
  '/create-car',
  auth(USER_ROLE.admin),
  validateRequest(createCarValidationSchema),
  CarControllers.createCar,
);

router.get('/', CarControllers.getAllCars);

router.get('/search', CarControllers.searchAvailableCars);

router.get('/:id', CarControllers.getSingleCarFromDB);

router.put(
  '/:id',
  auth(USER_ROLE.admin),
  validateRequest(updateCarValidationSchema),
  CarControllers.updateCarFromDB,
);

router.delete('/:id', auth(USER_ROLE.admin), CarControllers.deletedCarFromDB);


export const CarRoutes = router;