import express from 'express';

import { UserController } from './user.controller';

import validateRequest from '../../middlewares/validationRequest';
import { UserValidation } from './user.validation';

const router = express.Router();
router.post(
  '/create-faculty',
  validateRequest(UserValidation.createFacultyZodSchema),
  UserController.createFaculty
);
router.post(
  '/create-student',
  validateRequest(UserValidation.createStudentZodSchema),
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
export const UserRouter = router;
