import { Router } from 'express';
import validateRequest from '../utils/validateRequest';
import { createBookingValidationSchema } from './booking.validation';
import { BookingControlers } from './booking.controller';

const router = Router();

router.post(
  '/create-booking',
  validateRequest(createBookingValidationSchema),
  BookingControlers.createBooking,
);

router.get('/', BookingControlers.getAllBooking);

router.get('/:id', BookingControlers.getSingleBookingFromDB);

router.put('/:id', BookingControlers.updateBookingFromDB);

router.delete('/:id', BookingControlers.deletedBookingFromDB);

export const BookingRoutes = router;