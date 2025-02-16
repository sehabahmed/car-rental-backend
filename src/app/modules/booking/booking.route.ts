import { Router } from 'express';
import validateRequest from '../utils/validateRequest';
import { createBookingValidationSchema } from './booking.validation';
import { BookingControlers } from './booking.controller';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../users/user.constant';

const router = Router();

router.post(
  '/create-booking',
  auth(USER_ROLE.user),
  validateRequest(createBookingValidationSchema),
  BookingControlers.createBooking,
);

router.get('/', auth(USER_ROLE.admin), BookingControlers.getAllBooking);

router.get('/:id', BookingControlers.getSingleBookingFromDB);

router.put('/:id', BookingControlers.updateBookingFromDB);

router.delete('/:id', BookingControlers.deletedBookingFromDB);

export const BookingRoutes = router;
