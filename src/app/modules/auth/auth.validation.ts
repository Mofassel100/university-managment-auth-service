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
// const UpdateAcademicFacultyZodSchema = z.object({
//   body: z.object({
//     title: z.string({
//       required_error: 'title is requird',
//     }),
//   }),
// });

export const AuthValidation = {
  createZodSchema,
};
