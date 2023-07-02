import express from 'express';
import validateRequest from '../../middlewares/validationRequest';
import { AuthController } from './auth.controller';
import { AuthValidation } from './auth.validation';

const router = express.Router();
router.post(
  '/login',
  validateRequest(AuthValidation.createZodSchema),
  AuthController.loginUser
);
// router.delete('/:id', StudentController.deleteStudent);
// router.get('/', StudentController.getAllStudents);
// router.patch(
//   '/:id',
//   validateRequest(StudentUpdateValidation.StudentUpdateZodSchema),
//   StudentController.updateStudent
// );

export const AuthRoutes = router;
