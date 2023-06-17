import express from 'express';
import { academicDepartmentRoutes } from '../modules/academicDepartment/academicDepartment.router';
import { AcademicFacultyRouter } from '../modules/academicFaculty/academicFacult.Route';
import { AcademicSemesterRouter } from '../modules/academicSemester/academicSemesterRoute';
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
];
modulesRoutes.forEach(route => router.use(route.path, route.route));

export default router;
