import express from 'express';
import { AcademicDepartmentRoutes } from '../modules/academicDepartment/academicDepartment.router';
import { AcademicFacultyRouter } from '../modules/academicFaculty/academicFacult.Route';
import { AcademicSemesterRouter } from '../modules/academicSemester/academicSemesterRoute';
import { AdminRoutes } from '../modules/admin/admin.routers';
import { AuthRoutes } from '../modules/auth/auth.routes';
import { FacultyRouter } from '../modules/faculty/faculty.routes';
import { ManagementDepartmentRoutes } from '../modules/managementDepartment/managementDepartment.routes';
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
    route: AcademicDepartmentRoutes,
  },
  {
    path: '/students',
    route: StudentRoutes,
  },
  {
    path: '/facultys',
    route: FacultyRouter,
  },
  {
    path: '/managementDepartment',
    route: ManagementDepartmentRoutes,
  },
  {
    path: '/admins',
    route: AdminRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
];
modulesRoutes.forEach(route => router.use(route.path, route.route));

export default router;
