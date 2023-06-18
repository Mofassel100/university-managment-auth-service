import { IAcademicSemester } from '../academicSemester/academicSemisterInterface';
import { User } from './user.model';

export const findLastStudentId = async (): Promise<string | undefined> => {
  const lastStudent = await User.findOne({ role: 'student' }, { id: 1, _id: 0 })
    .sort({ createdAt: -1 })
    .lean();
  return lastStudent?.id ? lastStudent.id.substring(4) : undefined;
};
// After code
export const generateStudentId = async (
  academicSemester: IAcademicSemester | null
): Promise<string> => {
  const currentId =
    (await findLastStudentId()) || (0).toString().padStart(5, '0');
  let increamendId = (parseInt(currentId) + 1).toString().padStart(5, '0');
  increamendId = `${academicSemester?.year.substring(2)}${
    academicSemester?.code
  }${increamendId}`;
  return increamendId;
};
export const findLastFacultyId = async (): Promise<string | undefined> => {
  const lastFaculty = await User.findOne({ role: 'faculty' }, { id: 1, _id: 0 })
    .sort({ createdAt: -1 })
    .lean();
  return lastFaculty?.id ? lastFaculty.id.substring(2) : undefined;
};
export const generateFacultyId = async (): Promise<string> => {
  const currentId =
    (await findLastFacultyId()) || (0).toString().padStart(5, '0');
  let increamentedID = (parseInt(currentId) + 1).toString().padStart(5, '0');
  increamentedID = `F-${increamentedID}`;
  return increamentedID;
};
// BEFORE
// export const findLastUserId = async (): Promise<string | undefined> => {
//   const lastUser = await User.findOne({}, { id: 1, _id: 0 })
//     .sort({ createdAt: -1 })
//     .lean();
//   return lastUser?.id;
// };

// export const generateUserId = async (): Promise<string> => {
//   const currentId = (await findLastUserId()) || (0).toString().padStart(5, '0');
//   const increamendId = (parseInt(currentId) + 1).toString().padStart(5, '0');
//   return increamendId;
// };
