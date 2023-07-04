import { z } from 'zod';

const createZodSchema = z.object({
  body: z.object({
    id: z.string({
      required_error: 'id is requird',
    }),
    password: z.string({
      required_error: 'password is requird',
    }),
  }),
});
const refreshTokenZodSchema = z.object({
  cookies: z.object({
    refreshToken: z.string({
      required_error: 'Refresh Token is requird',
    }),
  }),
});
export const AuthValidation = {
  createZodSchema,
  refreshTokenZodSchema,
};
