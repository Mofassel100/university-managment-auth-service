import express from 'express';
import validateRequest from '../../middlewares/validationRequest';
import { academicSemesterValidation } from './academicSemester.Validetion';
import { AcademicSemesterController } from './academicSemesterController';

const router = express.Router();
router.post(
  '/academic-semester',
  validateRequest(academicSemesterValidation.createAcademicSemesterZodSchema),
  AcademicSemesterController.createAcademicsemester
);
export const AcademicSemesterRouter = router;
