import { z } from 'zod';
import mongoose from 'mongoose';

const TIME_REGEX = /^([01]\d|2[0-3]):([0-5]\d)$/;
const TIME_FORMAT_ERROR = 'Invalid time format (HH:mm)';

export const createBookingValidationSchema = z.object({
  body: z.object({
    date: z.string().refine((val) => !isNaN(Date.parse(val)), {
      message: 'Invalid date format',
    }), // Accepts date string like "YYYY-MM-DD"
    car: z.string().refine((val) => mongoose.Types.ObjectId.isValid(val), {
      message: 'Invalid Car ID',
    }),
    startTime: z.string().regex(TIME_REGEX, TIME_FORMAT_ERROR),

    endTime: z.string().regex(TIME_REGEX, TIME_FORMAT_ERROR).optional(),
  }),
});

export const updateBookingValidationSchema = z.object({
  body: z.object({
    bookingId: z
      .string()
      .refine((val) => mongoose.Types.ObjectId.isValid(val), {
        message: 'Invalid Car ID',
      }),
    endTime: z.string().regex(TIME_REGEX, TIME_FORMAT_ERROR),
  }),
});
