import { z } from 'zod';
import {
  academicSemesteZodTitle,
  academicSemesterMonth,
  academictSemesterZodCode,
} from './academicSemester.constant';

const createAcademicSemesterZodSchema = z.object({
  body: z.object({
    title: z.enum([...academicSemesteZodTitle] as [string, ...string[]], {
      required_error: 'title is required',
    }),
    year: z.number({
      required_error: 'Year is required',
    }),
    code: z.enum([...academictSemesterZodCode] as [string, ...string[]]),
    startMonth: z.enum([...academicSemesterMonth] as [string, ...string[]], {
      required_error: 'startMonth is Required',
    }),
    endMonth: z.enum([...academicSemesterMonth] as [string, ...string[]], {
      required_error: 'endMonth is required',
    }),
  }),
});
export const academicSemesterValidation = {
  createAcademicSemesterZodSchema,
};
