import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFiles } from '../../../constants/paganition';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { AcademicFacultyService } from './academicFacult.Service';
import { academicFacultyFilteringTermFiles } from './academicFacult.constant';

const createAcademicFaculty = catchAsync(
  async (req: Request, res: Response) => {
    const academicFacultyData = req.body;
    const result = await AcademicFacultyService.createFaculty(
      academicFacultyData
    );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'AcademicFaculty Data create Success Full',
      data: result,
    });

    // res.status(200).json({
    //   success: true,
    //   message: `Academic Semester create successfull`,
    //   data: result,
    // });
  }
);
const geteAllFaculty = catchAsync(async (req: Request, res: Response) => {
  const filterss = pick(req.query, academicFacultyFilteringTermFiles);
  const paginationOptions = pick(req.query, paginationFiles);
  const result = await AcademicFacultyService.getAllFaculty(
    filterss,
    paginationOptions
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Pagination retrieved succefull',
    meta: result.meta,
    data: result.data,
  });
});
const getSigleFaculty = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const result = await AcademicFacultyService.getSingleFaculty(id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Pagination retrieved succefull',
      data: result,
    });

    next();
  }
);
const UpdateFaculty = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const UpdateData = req.body;
  const result = await AcademicFacultyService.UpdateFaculty(id, UpdateData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Pagination retrieved succefull',
    data: result,
  });
});
const DeleteSigleFaculty = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const result = await AcademicFacultyService.DeleteSingleFaculty(id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Semester Delete succefull',
      data: result,
    });

    next();
  }
);
export const AcademicFacultyController = {
  createAcademicFaculty,
  geteAllFaculty,
  getSigleFaculty,
  UpdateFaculty,
  DeleteSigleFaculty,
};
