import express from 'express';
import validateRequest from '../../middlewares/validationRequest';
import { FacultyUpdateValidation } from './faculty.validation';

const router = express.Router();
router.patch(
  '/create-faculty',
  validateRequest(FacultyUpdateValidation.FacultyUpdateZodSchema)
  // UserController.UpdateFaculty
);
export const FacultyRouter = router;
