import { z } from 'zod';

export const signupUserValidationSchema = z.object({
  body: z.object({
    password: z.string().optional(),
    user: z.object({
      name: z.string({ required_error: 'Name is required' }),
      email: z
        .string({ required_error: 'Email is required' })
        .email('Invalid email format'),
      role: z.enum(['user', 'admin']).default('user'),
      phone: z.number({ required_error: 'Phone number is required' }),
      address: z.string({ required_error: 'Address is required' }),
    }),
  }),
});

export const updateUserValidationSchema = z.object({
  body: z.object({
    password: z.string().optional(),
    user: z.object({
      name: z.string({ required_error: 'Name is required' }).optional(),
      email: z
        .string({ required_error: 'Email is required' })
        .email('Invalid email format')
        .optional(),
      role: z.enum(['user', 'admin']).default('user').optional(),
      phone: z
        .number({ required_error: 'Phone number is required' })
        .optional(),
      address: z.string({ required_error: 'Address is required' }).optional(),
    }),
  }),
});
