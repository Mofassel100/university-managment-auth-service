import status from 'http-status';
import { Schema, model } from 'mongoose';
import ApiError from '../../../errors/ApiError';
import {
  IManagmentDepartment,
  ManagemtntDepartmentModel,
} from './managementDepartment.interface';

const ManagmentDepartmentSchema = new Schema<
  IManagmentDepartment,
  ManagemtntDepartmentModel
>(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);
ManagmentDepartmentSchema.pre('save', async function (next) {
  const isExist = await ManagementDepartment.findOne({
    title: this.title,
  });
  if (isExist) {
    throw new ApiError(
      status.CONFLICT,
      'Management Department is already exist'
    );
  }
  next();
});

export const ManagementDepartment = model<
  IManagmentDepartment,
  ManagemtntDepartmentModel
>('ManagementDepartment', ManagmentDepartmentSchema);
