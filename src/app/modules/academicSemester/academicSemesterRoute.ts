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
router.get('/:id', AcademicSemesterController.getSigleSemester);
router.patch(
  '/:id',
  validateRequest(academicSemesterValidation.UpdateAcademicSemesterZodSchema),
  AcademicSemesterController.UpdateSemester
);
router.delete('/:id', AcademicSemesterController.DeleteSigleSemester);
router.get('/', AcademicSemesterController.geteAllSemesters);
export const AcademicSemesterRouter = router;
