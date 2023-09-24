import httpStatus from 'http-status';
import { SortOrder } from 'mongoose';
import ApiError from '../../../errors/ApiError';
import { paginationHelper } from '../../../helpars/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { pagination } from '../../../interfaces/paginationOptions';
import { AcademicSemester } from './AcademicSemesterModel';
import {
  AcademicSemesterTitleCodeMapper,
  academicSemesterSeachTermFiles,
} from './academicSemester.constant';
import {
  IAcademicSemester,
  IAcademicSemesterCreateEvents,
  IAcademicSemesterFilters,
} from './academicSemisterInterface';

const createSemester = async (
  payload: IAcademicSemester
): Promise<IAcademicSemester> => {
  if (AcademicSemesterTitleCodeMapper[payload.title] !== payload.code) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid semester Code');
  }
  const result = await AcademicSemester.create(payload);
  return result;
};

const getAllSemsters = async (
  filters: IAcademicSemesterFilters,
  paginationOptions: pagination
): Promise<IGenericResponse<IAcademicSemester[]>> => {
  // filters method
  const { searchTerm, ...filtersData } = filters;
  const andConditions = [];
  if (searchTerm) {
    andConditions.push({
      $or: academicSemesterSeachTermFiles.map(files => ({
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
  // const andConditions = [
  //   {
  //     $or: [
  //       {
  //         title: {
  //           $regex: searchTerm,
  //           $options: 'i',
  //         },
  //       },
  //       {
  //         code: {
  //           $regex: searchTerm,
  //           $options: 'i',
  //         },
  //       },
  //       {
  //         year: {
  //           $regex: searchTerm,
  //           $options: 'i',
  //         },
  //       },
  //     ],
  //   },
  // ];

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
  const result = await AcademicSemester.find(whereCondition)
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
const getSingleSemester = async (id: string) => {
  const result = await AcademicSemester.findById(id);
  return result;
};
const UpdateSemster = async (
  id: string,
  payload: Partial<IAcademicSemester>
): Promise<IAcademicSemester | null> => {
  if (
    payload.title &&
    payload.code &&
    AcademicSemesterTitleCodeMapper[payload.title] !== payload.code
  ) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid semester Code');
  }
  const result = await AcademicSemester.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};
const DeleteSingleSemester = async (
  id: string
): Promise<IAcademicSemester | null> => {
  const result = await AcademicSemester.findByIdAndDelete(id);
  return result;
};
const createSemesterEvents = async (
  e: IAcademicSemesterCreateEvents
): Promise<void> => {
  await AcademicSemester.create({
    year: e.year,
    title: e.title,
    code: e.code,
    startMonth: e.startMonth,
    endMonth: e.endMonth,
    syncId: e.id,
  });
};
const UpdateOneIntoDBEvents = async (
  e: Partial<IAcademicSemesterCreateEvents>
): Promise<void> => {
  await AcademicSemester.findOneAndUpdate(
    {
      syncId: e.id,
    },
    {
      $set: {
        year: e.year,
        title: e.title,
        code: e.code,
        startMonth: e.startMonth,
        endMonth: e.endMonth,
      },
    }
  );
};
const DeletedOneIntoDBEvents = async (
  e: Partial<IAcademicSemesterCreateEvents>
): Promise<void> => {
  await AcademicSemester.findOneAndDelete({
    syncId: e.id,
  });
};
const GetSingleOneIntoDBEvents = async (
  e: Partial<IAcademicSemesterCreateEvents>
): Promise<void> => {
  await AcademicSemester.findOne({
    syncId: e.id,
  });
};
const GetAllOneIntoDBEvents = async (
  e: Partial<IAcademicSemesterCreateEvents>
): Promise<void> => {
  await AcademicSemester.find({
    syncId: e.id,
  });
};

export const AcademicSemesterService = {
  createSemester,
  getAllSemsters,
  getSingleSemester,
  UpdateSemster,
  DeleteSingleSemester,
  createSemesterEvents,
  UpdateOneIntoDBEvents,
  DeletedOneIntoDBEvents,
  GetSingleOneIntoDBEvents,
  GetAllOneIntoDBEvents,
};
