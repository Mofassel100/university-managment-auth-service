import express from 'express';
import validateRequest from '../../middlewares/validationRequest';
import { FacultyController } from './faculty.controller';
import { FacultyUpdateValidation } from './faculty.validation';

const router = express.Router();
router.get('/:id', FacultyController.getSingleFaculty);
router.delete('/:id', FacultyController.deleteFaculty);
router.get('/', FacultyController.getAllFaculty);
router.patch(
  '/:id',
  validateRequest(FacultyUpdateValidation.FacultyUpdateZodSchema)
  // UserController.UpdateFaculty
);
export const FacultyRouter = router;
