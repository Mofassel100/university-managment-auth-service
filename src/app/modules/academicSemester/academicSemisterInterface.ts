import { Model } from 'mongoose';
export type IAcademicSemesterZodMonth =
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
export type IAcademicSemesterZodTitle = 'Autumn' | 'Summer' | 'Fall';
export type IAcademicSemesterZodCode = '01' | '02' | '03';
export type IAcademicSemester = {
  title: IAcademicSemesterZodTitle;
  year: number;
  code: IAcademicSemesterZodCode;
  startMonth: IAcademicSemesterZodMonth;
  endMonth: IAcademicSemesterZodMonth;
};
export type AcademicSemesterModel = Model<IAcademicSemester>;
