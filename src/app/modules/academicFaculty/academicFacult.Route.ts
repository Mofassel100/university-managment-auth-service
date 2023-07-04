import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validationRequest';
import { academicFacultyValidation } from './academicFacult.Validation';
import { AcademicFacultyController } from './academicFacult.controller';
const router = express.Router();
router.post(
  '/create-faculty',
  validateRequest(academicFacultyValidation.createAcademicFacultyZodSchema),
  AcademicFacultyController.createAcademicFaculty
);

router.get(
  '/:id',
  auth(
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.FACULTY,
    ENUM_USER_ROLE.STUDENT,
    ENUM_USER_ROLE.SUPER_ADMIN
  ),
  AcademicFacultyController.getSigleFaculty
);
router.patch(
  '/:id',
  validateRequest(academicFacultyValidation.UpdateAcademicFacultyZodSchema),
  auth(
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.FACULTY,
    ENUM_USER_ROLE.SUPER_ADMIN
  ),
  AcademicFacultyController.UpdateFaculty
);
router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  AcademicFacultyController.DeleteSigleFaculty
);
router.get(
  '/',
  auth(
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.FACULTY,
    ENUM_USER_ROLE.STUDENT,
    ENUM_USER_ROLE.SUPER_ADMIN
  ),
  AcademicFacultyController.geteAllFaculty
);
// router.get('/',FacultyController.getAllFaculties);

// router.get('/:id', FacultyController.getSingleFaculty);

// router.patch('/:id',
//   validateRequest( FacultyController.updateFacultyZodSchema),
//   FacultyController.updateFaculty
// );
export const AcademicFacultyRouter = router;
