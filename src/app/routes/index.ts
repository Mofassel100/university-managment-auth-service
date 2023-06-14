import express from 'express';
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
];
modulesRoutes.forEach(route => router.use(route.path, route.route));

export default router;
