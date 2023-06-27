import express from 'express';

import validateRequest from '../../middlewares/validationRequest';
import { StudentUpdateValidation } from './student.Validation';
import { StudentController } from './student.controller';

const router = express.Router();
router.get('/:id', StudentController.getSingleStudent);
router.delete('/:id', StudentController.deleteStudent);
router.get('/', StudentController.getAllStudents);
router.patch(
  '/:id',
  validateRequest(StudentUpdateValidation.StudentUpdateZodSchema),
  StudentController.updateStudent
);

export const StudentRoutes = router;
