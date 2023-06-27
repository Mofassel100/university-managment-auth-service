import { SortOrder } from 'mongoose';
import { paginationHelper } from '../../../helpars/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { pagination } from '../../../interfaces/paginationOptions';
import { managmentDepartmentSeachTermFiles } from './managementDepartment.constant';
import {
  IManagmentDepartment,
  IManagmentDepartmentFilters,
} from './managementDepartment.interface';
import { ManagementDepartment } from './managementDepartment.model';
const createManagementDepartment = async (
  payload: IManagmentDepartment
): Promise<IManagmentDepartment | null> => {
  const result = await ManagementDepartment.create(payload);
  return result;
};

const getAllManagementDepartments = async (
  filters: IManagmentDepartmentFilters,
  paginationOptions: pagination
): Promise<IGenericResponse<IManagmentDepartment[]>> => {
  // filters method
  const { searchTerm, ...filtersData } = filters;
  const andConditions = [];
  if (searchTerm) {
    andConditions.push({
      $or: managmentDepartmentSeachTermFiles.map(files => ({
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
  const result = await ManagementDepartment.find(whereCondition)
    .populate('academicFaculty')
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);
  const total = await ManagementDepartment.countDocuments(whereCondition);
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};
const getSingleManagementDepartment = async (id: string) => {
  const result = await ManagementDepartment.findById(id);
  return result;
};
const UpdateMenegementDepart = async (
  id: string,
  payload: Partial<IManagmentDepartment>
): Promise<IManagmentDepartment | null> => {
  const result = await ManagementDepartment.findOneAndUpdate(
    { _id: id },
    payload,
    {
      new: true,
    }
  );
  return result;
};
const DeleteSingleManagementDepartment = async (
  id: string
): Promise<IManagmentDepartment | null> => {
  const result = await ManagementDepartment.findByIdAndDelete(id);
  return result;
};

export const ManagementDepartmentService = {
  createManagementDepartment,
  getAllManagementDepartments,
  getSingleManagementDepartment,
  UpdateMenegementDepart,
  DeleteSingleManagementDepartment,
};
