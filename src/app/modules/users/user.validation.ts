import { z } from 'zod';

const createUserZodSchema = z.object({
  body: z.object({
    role: z.string({
      required_error: 'role is requeired',
    }),
    password: z.string().optional(),
  }),
});
export const UserValidation = { createUserZodSchema };
