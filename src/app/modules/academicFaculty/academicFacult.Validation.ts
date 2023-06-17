import { z } from 'zod';

const createAcademicFacultyZodSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'title is requird',
    }),
  }),
});
const UpdateAcademicFacultyZodSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'title is requird',
    }),
  }),
});

export const academicFacultyValidation = {
  createAcademicFacultyZodSchema,
  UpdateAcademicFacultyZodSchema,
};
