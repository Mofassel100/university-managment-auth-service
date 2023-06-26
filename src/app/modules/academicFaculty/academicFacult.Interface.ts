import { Model } from 'mongoose';

export type IAcademicFaculty = {
  title: string;
};
// export type IFaculty = {
//   title: string;
// };
export type AcademicFacultyModel = Model<
  IAcademicFaculty,
  Record<string, unknown>
>;
export type IAcademicFacultyFilters = {
  searchTerm?: string;
};
