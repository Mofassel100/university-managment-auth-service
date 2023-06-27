import express from 'express';
import validateRequest from '../../middlewares/validationRequest';
import { AdminUpdateValidation } from './admin.Validation';
import { AdminController } from './admin.controller';
const router = express.Router();
router.get('/:id', AdminController.getSingleAdmin);
router.delete('/:id', AdminController.deleteAdmin);
router.patch(
  '/:id',
  validateRequest(AdminUpdateValidation.AdminUpdateZodSchema),
  AdminController.updateAdmin
);
router.get('/', AdminController.getAllAdmins);

export const AdminRoutes = router;
