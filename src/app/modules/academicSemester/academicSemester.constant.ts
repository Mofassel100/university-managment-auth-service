import {
  IAcademicSemesterZodCode,
  IAcademicSemesterZodMonth,
  IAcademicSemesterZodTitle,
} from './academicSemisterInterface';

export const academicSemesterMonth: IAcademicSemesterZodMonth[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
export const academicSemesteZodTitle: IAcademicSemesterZodTitle[] = [
  'Autumn',
  'Summer',
  'Fall',
];
export const academictSemesterZodCode: IAcademicSemesterZodCode[] = [
  '01',
  '02',
  '03',
];
export const AcademicSemesterTitleCodeMapper: {
  [key: string]: string;
} = {
  Autumn: '01',
  Summer: '02',
  Fall: '03',
};
