import { Model } from 'mongoose';
export type IAcademicSemesterMonth =
  | 'January'
  | 'February'
  | 'March'
  | 'April'
  | 'May'
  | 'June'
  | 'July'
  | 'August'
  | 'September'
  | 'October'
  | 'November'
  | 'December';
export type IAcademicSemesterTitle = 'Autumn' | 'Summer' | 'Fall';
export type IAcademicSemesterCode = '01' | '02' | '03';
export type IAcademicSemester = {
  title: IAcademicSemesterTitle;
  year: number;
  code: IAcademicSemesterCode;
  startMonth: IAcademicSemesterMonth;
  endMonth: IAcademicSemesterMonth;
  syncId: string;
};
export type AcademicSemesterModel = Model<IAcademicSemester>;
export type IAcademicSemesterFilters = {
  searchTerm?: string;
};
export type IAcademicSemesterCreateEvents = {
  year: number;
  title: string;
  code: string;
  startMonth: string;
  endMonth: string;
  id: string;
};
