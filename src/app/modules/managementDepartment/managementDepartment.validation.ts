import { z } from 'zod';

const createManagementDepartmentZodSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'title is requird',
    }),
  }),
});
const UpdateManagementDepartmentZodSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'title is requird',
    }),
  }),
});

export const ManagementDepartmentValidation = {
  createManagementDepartmentZodSchema,
  UpdateManagementDepartmentZodSchema,
};
