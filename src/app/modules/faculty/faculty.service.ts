import httpStatus from 'http-status';
import mongoose, { SortOrder } from 'mongoose';
import ApiError from '../../../errors/ApiError';
import { IPoption, paginationHelper } from '../../../helpars/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { RedisClinet } from '../../../shared/redis';
import { User } from '../users/user.model';
import {
  EVENT_DELETE_FACULTY,
  EVENT_GET_ALL_FACULTY,
  EVENT_GET_SINGLE_FACULTY,
  EVENT_UPDATED_FACULTY,
  FacultySearchableFields,
} from './faculty.constant';
import { IFaculty, IFacultyFilters } from './faculty.interface';
import { Faculty } from './faculty.modal';

const getAllFaculty = async (
  filters: IFacultyFilters,
  paginationOptions: IPoption
): Promise<IGenericResponse<IFaculty[]>> => {
  const { searchTerm, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper.calculatePagination(paginationOptions);
  const andConditions = [];
  if (searchTerm) {
    andConditions.push({
      $or: FacultySearchableFields.map(field => ({
        [field]: {
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
  const sortConditions: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }
  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};
  const result = await Faculty.find(whereConditions)
    .populate('academicDepartment')
    .populate('academicFaculty')
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);
  const total = await Faculty.countDocuments(whereConditions);
  if (result) {
    await RedisClinet.publish(EVENT_GET_ALL_FACULTY, JSON.stringify(result));
  }
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};
const getSingleFaculty = async (id: string): Promise<IFaculty | null> => {
  const result = await Faculty.findById(id)
    .populate('academicDepartment')
    .populate('academicFaculty');
  if (result) {
    await RedisClinet.publish(EVENT_GET_SINGLE_FACULTY, JSON.stringify(result));
  }
  return result;
};

const updateFaculty = async (
  id: string,
  payload: Partial<IFaculty>
): Promise<IFaculty | null> => {
  const isExist = await Faculty.findOne({ id });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Faculty not found !');
  }

  const { name, ...FacultData } = payload;

  const updatedFacultyData: Partial<IFaculty> = { ...FacultData };

  /* const name ={
    fisrtName: 'Mezba',  <----- update korar jnno
    middleName:'Abedin',
    lastName: 'Forhan'
  }
*/

  // dynamically handling

  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach(key => {
      const nameKey = `name.${key}` as keyof Partial<IFaculty>; // `name.fisrtName`
      (updatedFacultyData as any)[nameKey] = name[key as keyof typeof name];
    });
  }
  const result = await Faculty.findOneAndUpdate({ id }, updatedFacultyData, {
    new: true,
  })
    .populate('academicDepartment')
    .populate('academicFaculty');
  if (result) {
    await RedisClinet.publish(EVENT_UPDATED_FACULTY, JSON.stringify(result));
  }
  return result;
};

const deleteFaculty = async (id: string): Promise<IFaculty | null> => {
  // check if the faculty is exist
  const isExist = await Faculty.findOne({ id });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Faculty not found !');
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    //delete faculty first
    const faculty = await Faculty.findOneAndDelete({ id }, { session });
    if (!faculty) {
      throw new ApiError(404, 'Failed to delete student');
    }
    //delete user
    await User.deleteOne({ id });
    session.commitTransaction();
    session.endSession();
    if (faculty) {
      await RedisClinet.publish(EVENT_DELETE_FACULTY, JSON.stringify(faculty));
    }
    return faculty;
  } catch (error) {
    session.abortTransaction();
    throw error;
  }
};

export const FacultyService = {
  getAllFaculty,
  getSingleFaculty,
  updateFaculty,
  deleteFaculty,
};
