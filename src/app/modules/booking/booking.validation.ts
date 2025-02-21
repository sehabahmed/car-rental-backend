import { z } from 'zod';
import mongoose from 'mongoose';

export const createBookingValidationSchema = z.object({
  body: z.object({
    date: z.string().refine((val) => !isNaN(Date.parse(val)), {
      message: 'Invalid date format',
    }), // Accepts date string like "YYYY-MM-DD"
    car: z.string().refine((val) => mongoose.Types.ObjectId.isValid(val), {
      message: 'Invalid Car ID',
    }),
    startTime: z
      .string()
      .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, 'Invalid time format (HH:mm)'),

    endTime: z
      .string()
      .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, 'Invalid time format (HH:mm)')
      .optional(),
  }),
});

export const updateBookingValidationSchema = z.object({
  body: z.object({
    bookingId: z
      .string()
      .refine((val) => mongoose.Types.ObjectId.isValid(val), {
        message: 'Invalid Car ID',
      }),
    endTime: z
      .string()
      .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, 'Invalid time format (HH:mm)'),
  }),
});
