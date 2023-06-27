import express from 'express';
import validateRequest from '../../middlewares/validationRequest';
import { academicFacultyValidation } from './academicFacult.Validation';
import { AcademicFacultyController } from './academicFacult.controller';
const router = express.Router();
router.post(
  '/create-faculty',
  validateRequest(academicFacultyValidation.createAcademicFacultyZodSchema),
  AcademicFacultyController.createAcademicFaculty
);
router.get('/:id', AcademicFacultyController.getSigleFaculty);
router.patch(
  '/:id',
  validateRequest(academicFacultyValidation.UpdateAcademicFacultyZodSchema),
  AcademicFacultyController.UpdateFaculty
);
router.delete('/:id', AcademicFacultyController.DeleteSigleFaculty);
router.get('/', AcademicFacultyController.geteAllFaculty);
// router.get('/',FacultyController.getAllFaculties);

// router.get('/:id', FacultyController.getSingleFaculty);

// router.patch('/:id',
//   validateRequest( FacultyController.updateFacultyZodSchema),
//   FacultyController.updateFaculty
// );
export const AcademicFacultyRouter = router;
