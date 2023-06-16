import express from 'express';
import validateRequest from '../../middlewares/validationRequest';
import { academicSemesterValidation } from './academicSemester.Validetion';
import { AcademicSemesterController } from './academicSemesterController';

const router = express.Router();
router.post(
  '/create-semester',
  validateRequest(academicSemesterValidation.createAcademicSemesterZodSchema),
  AcademicSemesterController.createAcademicsemester
);
router.get('/', AcademicSemesterController.geteAllSemesters);
export const AcademicSemesterRouter = router;
