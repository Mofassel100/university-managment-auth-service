import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { AcademicSemester } from './AcademicSemesterModel';
import { AcademicSemesterTitleCodeMapper } from './academicSemester.constant';
import { IAcademicSemester } from './academicSemisterInterface';

const createSemester = async (
  payload: IAcademicSemester
): Promise<IAcademicSemester> => {
  if (AcademicSemesterTitleCodeMapper[payload.title] !== payload.code) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid semester Code');
  }
  const result = await AcademicSemester.create(payload);
  return result;
};
export const AcademicSemesterService = {
  createSemester,
};
