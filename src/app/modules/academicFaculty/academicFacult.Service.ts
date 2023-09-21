import { SortOrder } from 'mongoose';
import { paginationHelper } from '../../../helpars/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { pagination } from '../../../interfaces/paginationOptions';
import { AcademicSemester } from '../academicSemester/AcademicSemesterModel';
import {
  IAcademicFaculty,
  IAcademicFacultyCreateEvents,
  IAcademicFacultyFilters,
} from './academicFacult.Interface';
import { AcademicFaculty } from './academicFacult.Model';
import { academicFacultySeachTermFiles } from './academicFacult.constant';
const createFaculty = async (
  payload: IAcademicFaculty
): Promise<IAcademicFaculty | null> => {
  const result = await AcademicFaculty.create(payload);
  return result;
};

const getAllFaculty = async (
  filters: IAcademicFacultyFilters,
  paginationOptions: pagination
): Promise<IGenericResponse<IAcademicFaculty[]>> => {
  // filters method
  const { searchTerm, ...filtersData } = filters;
  const andConditions = [];
  if (searchTerm) {
    andConditions.push({
      $or: academicFacultySeachTermFiles.map(files => ({
        [files]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }
  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  // pagination method
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper.calculatePagination(paginationOptions);
  const sortConditions: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }
  // const { page = 1, limit = 10 } = paginationOptions;
  // const skip = (page - 1) * limit;
  const whereCondition =
    andConditions.length > 0 ? { $and: andConditions } : {};
  const result = await AcademicFaculty.find(whereCondition)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);
  const total = await AcademicSemester.countDocuments();
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};
const getSingleFaculty = async (id: string) => {
  const result = await AcademicFaculty.findById(id);
  return result;
};
const UpdateFaculty = async (
  id: string,
  payload: Partial<IAcademicFaculty>
): Promise<IAcademicFaculty | null> => {
  const result = await AcademicFaculty.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};
const DeleteSingleFaculty = async (
  id: string
): Promise<IAcademicFaculty | null> => {
  const result = await AcademicFaculty.findByIdAndDelete(id);
  return result;
};
const createFacultyEvents = async (
  e: IAcademicFacultyCreateEvents
): Promise<void> => {
  await AcademicFaculty.create({
    title: e.title,
    syncId: e.id,
  });
};
const UpdateOneIntoDBEvents = async (
  e: Partial<IAcademicFacultyCreateEvents>
): Promise<void> => {
  await AcademicFaculty.findOneAndUpdate(
    {
      syncId: e.id,
    },
    {
      $set: {
        title: e.title,
      },
    }
  );
};
const DeletedOneIntoDBEvents = async (
  e: Partial<IAcademicFacultyCreateEvents>
): Promise<void> => {
  await AcademicFaculty.findOneAndDelete({
    syncId: e.id,
  });
};
const GetSingleOneIntoDBEvents = async (
  e: Partial<IAcademicFacultyCreateEvents>
): Promise<void> => {
  await AcademicFaculty.findOne({
    syncId: e.id,
  });
};
const GetAllOneIntoDBEvents = async (
  e: Partial<IAcademicFacultyCreateEvents>
): Promise<void> => {
  await AcademicFaculty.findOne({
    syncId: e.id,
  });
};
export const AcademicFacultyService = {
  DeleteSingleFaculty,
  createFaculty,
  UpdateFaculty,
  getAllFaculty,
  getSingleFaculty,
  createFacultyEvents,
  UpdateOneIntoDBEvents,
  GetAllOneIntoDBEvents,
  GetSingleOneIntoDBEvents,
  DeletedOneIntoDBEvents,
};
