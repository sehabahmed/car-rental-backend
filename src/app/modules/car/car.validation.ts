import { z } from 'zod';

export const createCarValidationSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'Name is required' }),
    description: z.string({ required_error: 'Description is required' }),
    color: z.string({ required_error: 'Color is required' }),
    isElectric: z.boolean(),
    status: z.enum(['available', 'unavailable']).optional(),
    features: z.array(z.string()).default([]),
    pricePerHour: z.number().positive(),
    isDeleted: z.boolean().default(false),
  }),
});


export const updateCarValidationSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'Name is required' }).optional(),
    description: z.string({ required_error: 'Description is required' }).optional(),
    color: z.string({ required_error: 'Color is required' }).optional(),
    isElectric: z.boolean().optional(),
    status: z.enum(['available', 'unavailable']).optional(),
    features: z.array(z.string()).default([]).optional(),
    pricePerHour: z.number().positive().optional(),
  }),
});


