import { Model } from 'mongoose';

export type IManagmentDepartment = {
  title: string;
};
export type ManagemtntDepartmentModel = Model<
  IManagmentDepartment,
  Record<string, unknown>
>;
export type IManagmentDepartmentFilters = {
  searchTerm?: string;
};
