import httpStatus from 'http-status';
import mongoose from 'mongoose';
import config from '../../../config/index';
import ApiError from '../../../errors/ApiError';
import { AcademicSemester } from '../academicSemester/AcademicSemesterModel';
import { IStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { IUser } from './user.interface';
import { User } from './user.model';
import { generateStudentId } from './user.utilis';

const createStudent = async (
  student: IStudent,
  user: IUser
): Promise<IUser | null> => {
  if (!user.password) {
    user.password = config.defualt_student_pass as string;
  }
  // SET Role
  user.role = 'student';
  const academicsemester = await AcademicSemester.findById(
    student.academicSemester
  );
  // generate student id
  let newUserAllData = null;
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const id = await generateStudentId(academicsemester);
    user.id = id;
    student.id = id;
    // create student
    const newStudent = await Student.create([student], { session });
    if (!newStudent.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to newStudent');
    }
    // set student --> _id into user.student
    user.student = newStudent[0]._id;
    const newUser = await User.create([user], { session });
    if (!newUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failt to create Users');
    }
    newUserAllData = newUser[0];
    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }
  // user --> student ----> academicSemester,academicDepartment,academicFaculty
  if (newUserAllData) {
    newUserAllData = await User.findOne({ id: newUserAllData.id }).populate({
      path: 'student',
      populate: [
        {
          path: 'academicFaculty',
        },
        {
          path: 'academicSemester',
        },
        {
          path: 'academicDepartment',
        },
      ],
    });
  }
  return newUserAllData;
};
// const createStudent = async (
//   student: IStudent,
//   user: IUser
// ): Promise<IUser | null> => {
//   // auth generated increament password
//   // const id = await generateFacultyId();
//   // user.id = id;
//   // DEFUALD PASSWORD

//   if (!user.password) {
//     user.password = config.defualt_student_pass as string;
//   }
//   // SET ROLE
//   user.role = 'student';
//   const academicsemester = await AcademicSemester.findById(
//     student.academicSemester
//   );
//   // genereted student id
//   let newUserAllData = null;
//   const session = await mongoose.startSession();
//   try {
//     session.startTransaction();
//     const id = await generateStudentId(academicsemester as IAcademicSemester);
//     user.id = id;
//     student.id = id;
//     // array
//     const newStudent = await Student.create([student], { session });
//     if (!newStudent.length) {
//       throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create student');
//     }
//     // set student _id into user
//     user.student = newStudent[0]._id;
//     const newUser = await User.create([user], { session });
//     if (!newUser) {
//       throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create user');
//     }
//     newUserAllData = newUser[0];
//     await session.commitTransaction();
//     await session.endSession();
//   } catch (error) {
//     await session.abortTransaction();
//     await session.endSession();
//     throw error;
//   }
//   if (newUserAllData) {
//     newUserAllData = await User.findOne({ id: newUserAllData.id }).populate({
//       path: 'student',
//       populate: [
//         {
//           path: 'academicSemester',
//         },
//         {
//           path: 'academicDepartment',
//         },
//         {
//           path: 'academicFaculty',
//         },
//       ],
//     });
//   }
//   return newUserAllData;
// };

// const createFaculty = async (
//   faculty: IFaculty,
//   user: IUser
// ): Promise<IUser | null> => {
//   // default password
//   if (!user.password) {
//     user.password = config.defualt_faculty_pass as string;
//   }
//   // set role
//   user.role = 'faculty';

//   // generate faculty id
//   let newUserAllData = null;
//   const session = await mongoose.startSession();
//   try {
//     session.startTransaction();

//     const id = await generateFacultyId();
//     user.id = id;
//     faculty.id = id;

//     const newFaculty = await faculty.create([faculty], { session });

//     if (!newFaculty.length) {
//       throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create faculty ');
//     }

//     user.faculty = newFaculty[0]._id;

//     const newUser = await User.create([user], { session });

//     if (!newUser.length) {
//       throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create user');
//     }
//     newUserAllData = newUser[0];

//     await session.commitTransaction();
//     await session.endSession();
//   } catch (error) {
//     await session.abortTransaction();
//     await session.endSession();
//     throw error;
//   }

//   if (newUserAllData) {
//     newUserAllData = await User.findOne({ id: newUserAllData.id }).populate({
//       path: 'faculty',
//       populate: [
//         {
//           path: 'academicDepartment',
//         },
//         {
//           path: 'academicFaculty',
//         },
//       ],
//     });
//   }

//   return newUserAllData;
// };
export const UserService = {
  createStudent,
};
