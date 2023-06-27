import express from 'express';
import validateRequest from '../../middlewares/validationRequest';
import { ManagementDepartmentController } from './managementDepartment.controller';
import { ManagementDepartmentValidation } from './managementDepartment.validation';

const router = express.Router();
router.post(
  '/create-managementDepartment',
  validateRequest(
    ManagementDepartmentValidation.createManagementDepartmentZodSchema
  ),
  ManagementDepartmentController.createManagementDepartment
);
router.get('/:id', ManagementDepartmentController.getSigleMagementDepartment);
router.patch(
  '/:id',
  validateRequest(
    ManagementDepartmentValidation.UpdateManagementDepartmentZodSchema
  ),
  ManagementDepartmentController.UpdateManagementDepartment
);
router.delete(
  '/:id',
  ManagementDepartmentController.DeleteSingleManagmentDepartment
);
router.get('/', ManagementDepartmentController.geteAllManagementDepart);

export const ManagementDepartmentRoutes = router;
