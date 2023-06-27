import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFiles } from '../../../constants/paganition';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { managmentDepartmentFilteringTermFiles } from './managementDepartment.constant';
import { IManagmentDepartment } from './managementDepartment.interface';
import { ManagementDepartmentService } from './managementDepartment.service';

const createManagementDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const { ...MagengementDepartmentAllData } = req.body;
    const result = await ManagementDepartmentService.createManagementDepartment(
      MagengementDepartmentAllData
    );
    sendResponse<IManagmentDepartment>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'ManagementDepartment Data create Success Full',
      data: result,
    });
  }
);
const geteAllManagementDepart = catchAsync(
  async (req: Request, res: Response) => {
    const filterss = pick(req.query, managmentDepartmentFilteringTermFiles);
    const paginationOptions = pick(req.query, paginationFiles);
    const result =
      await ManagementDepartmentService.getAllManagementDepartments(
        filterss,
        paginationOptions
      );
    sendResponse<IManagmentDepartment[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Pagination ManagementDepartment retrieved succefull',
      meta: result.meta,
      data: result.data,
    });
  }
);
const getSigleMagementDepartment = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const result =
      await ManagementDepartmentService.getSingleManagementDepartment(id);
    sendResponse<IManagmentDepartment>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Pagination retrieved succefull',
      data: result,
    });

    next();
  }
);
const UpdateManagementDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const UpdateData = req.body;
    const result = await ManagementDepartmentService.UpdateMenegementDepart(
      id,
      UpdateData
    );
    sendResponse<IManagmentDepartment>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Pagination retrieved succefull',
      data: result,
    });
  }
);
const DeleteSingleManagmentDepartment = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const result =
      await ManagementDepartmentService.DeleteSingleManagementDepartment(id);
    sendResponse<IManagmentDepartment>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Delete Management Department Delete succefull',
      data: result,
    });

    next();
  }
);
export const ManagementDepartmentController = {
  createManagementDepartment,
  getSigleMagementDepartment,
  geteAllManagementDepart,
  UpdateManagementDepartment,
  DeleteSingleManagmentDepartment,
};
