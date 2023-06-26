import express from 'express';
import { academicDepartmentRoutes } from '../modules/academicDepartment/academicDepartment.router';
import { AcademicFacultyRouter } from '../modules/academicFaculty/academicFacult.Route';
import { AcademicSemesterRouter } from '../modules/academicSemester/academicSemesterRoute';
import { StudentRoutes } from '../modules/student/student.router';
import { UserRouter } from '../modules/users/user.router';
const router = express.Router();
const modulesRoutes = [
  {
    path: '/users/',
    route: UserRouter,
  },
  {
    path: '/academic-semesters/',
    route: AcademicSemesterRouter,
  },
  {
    path: '/academic-faculty/',
    route: AcademicFacultyRouter,
  },
  {
    path: '/academic-depertment/',
    route: academicDepartmentRoutes,
  },
  {
    path: '/student',
    route: StudentRoutes,
  },
];
modulesRoutes.forEach(route => router.use(route.path, route.route));

export default router;