import express from 'express';

import { UserController } from './user.controller';

import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validationRequest';
import { UserValidation } from './user.validation';

const router = express.Router();
router.post(
  '/create-faculty',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  validateRequest(UserValidation.createFacultyZodSchema),

  UserController.createFaculty
);
router.post(
  '/create-student',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  // validateRequest(UserValidation.createStudentZodSchema),
  UserController.createStudent
);
router.post(
  '/create-admin',
  validateRequest(UserValidation.createAdminZodSchema),
  UserController.createAdmin
);
// router.get(
//   '/',
//   validateRequest(UserValidation.createUserZodSchema),
//   UserController.createStudent
// );
export const UserRouters = router;
