import { optional, z } from 'zod';
import mongoose from 'mongoose';

export const createBookingValidationSchema = z.object({
  body: z.object({
    date: z.string().refine((val) => !isNaN(Date.parse(val)), {
      message: 'Invalid date format',
    }), // Accepts date string like "YYYY-MM-DD"
    user: z.string().refine((val) => mongoose.Types.ObjectId.isValid(val), {
      message: 'Invalid User ID',
    }),
    car: z.string().refine((val) => mongoose.Types.ObjectId.isValid(val), {
      message: 'Invalid Car ID',
    }),
    startTime: z
      .string()
      .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, 'Invalid time format (HH:mm)'),
    endTime: z
      .string()
      .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, 'Invalid time format (HH:mm)'),
  }),
  totalCost: z.number().optional(),
});

export const updateBookingValidationSchema = z.object({
  car: z.string().refine((val) => mongoose.Types.ObjectId.isValid(val), {
    message: 'Invalid Car ID',
  }),
  startTime: z
    .string()
    .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, 'Invalid time format (HH:mm)')
    .optional(),
  endTime: z
    .string()
    .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, 'Invalid time format (HH:mm)')
    .optional(),
});
