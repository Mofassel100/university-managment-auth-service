import httpStatus from 'http-status';
import { SortOrder } from 'mongoose';
import ApiError from '../../../errors/ApiError';
import { paginationHelper } from '../../../helpars/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { pagination } from '../../../interfaces/paginationOptions';
import { AcademicFaculty } from '../academicFaculty/academicFacult.Model';
import { academicDepartmentSearchableFields } from './academicDepartment.constant';
import {
  AcademicDepartmentCreatedEvent,
  AcademicDepartmentDeletedEvent,
  AcademicDepartmentUpdatedEvent,
  IAcademicDepartment,
  IAcademicDepartmentFilters,
} from './academicDepartment.interface';
import { AcademicDepartment } from './academicDepartment.model';
const getAllDepartments = async (
  filters: IAcademicDepartmentFilters,
  paginationOptions: pagination
): Promise<IGenericResponse<IAcademicDepartment[]>> => {
  const { limit, page, skip, sortBy, sortOrder } =
    paginationHelper.calculatePagination(paginationOptions);

  const { searchTerm, ...filtersData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: academicDepartmentSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $paginationOptions: 'i',
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

  const result = await AcademicDepartment.find(whereConditions)
    .populate('academicFaculty')
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await AcademicDepartment.countDocuments();

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};
const createDepartment = async (
  payload: IAcademicDepartment
): Promise<IAcademicDepartment | null> => {
  const result = (await AcademicDepartment.create(payload)).populate(
    'academicFaculty'
  );
  return result;
};

const getSingleDepartment = async (
  id: string
): Promise<IAcademicDepartment | null> => {
  const result = await AcademicDepartment.findById(id).populate(
    'academicFaculty'
  );
  return result;
};

const updateDepartment = async (
  id: string,
  payload: Partial<IAcademicDepartment>
): Promise<IAcademicDepartment | null> => {
  const result = await AcademicDepartment.findOneAndUpdate(
    { _id: id },
    payload,
    {
      new: true,
    }
  ).populate('academicFaculty');
  return result;
};

const deleteDepartment = async (
  id: string
): Promise<IAcademicDepartment | null> => {
  const result = await AcademicDepartment.findByIdAndDelete(id);
  return result;
};

// redis event
const createDepartmentEvents = async (
  e: AcademicDepartmentCreatedEvent
): Promise<void> => {
  const academicFaculty = await AcademicFaculty.findOne({
    syncId: e.academicFacultyId,
  });
  if (!academicFaculty) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'AcademicFaculty id not found');
  }
  const payload = {
    title: e.title,
    academicFaculty: academicFaculty?._id,
    syncId: e.id,
  };
  await AcademicDepartment.create(payload);
};
const UpdateOneIntoDBEvents = async (
  e: Partial<AcademicDepartmentUpdatedEvent>
): Promise<void> => {
  const academicFaculty = await AcademicFaculty.findOne({
    syncId: e.academicFacultyId,
  });
  const payload = {
    title: e.title,
    academicFaculty: academicFaculty?._id,
  };
  await AcademicDepartment.findOneAndUpdate(
    {
      syncId: e.id,
    },
    {
      $set: payload,
    }
  );
};
const DeletedOneIntoDBEvents = async (
  e: Partial<AcademicDepartmentDeletedEvent>
): Promise<void> => {
  await AcademicDepartment.findOneAndDelete({
    syncId: e.id,
  });
};
const GetSingleOneIntoDBEvents = async (
  e: Partial<AcademicDepartmentDeletedEvent>
): Promise<void> => {
  await AcademicDepartment.findOne({
    syncId: e.id,
  });
};
const GetAllOneIntoDBEvents = async (
  e: Partial<AcademicDepartmentDeletedEvent>
): Promise<void> => {
  await AcademicDepartment.findOne({
    syncId: e.id,
  });
};
export const AcademicDepartmentService = {
  getAllDepartments,
  getSingleDepartment,
  updateDepartment,
  deleteDepartment,
  createDepartment,
  createDepartmentEvents,
  UpdateOneIntoDBEvents,
  DeletedOneIntoDBEvents,
  GetAllOneIntoDBEvents,
  GetSingleOneIntoDBEvents,
};
