import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFiles } from '../../../constants/paganition';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { AcademicSemesterService } from './academicSemester.Service';
import { academicSemeterFilteringTermFiles } from './academicSemester.constant';
const createAcademicsemester = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { ...academicSemesteData } = req.body;
    const result = await AcademicSemesterService.createSemester(
      academicSemesteData
    );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'AcademicSemester Data create Success Full',
      data: result,
    });

    next();
    // res.status(200).json({
    //   success: true,
    //   message: `Academic Semester create successfull`,
    //   data: result,
    // });
  }
);
const geteAllSemesters = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    // const paginationOptions = {
    //   page: Number(req.query.page),
    //   limit: Number(req.query.limit),
    //   sortBy: req.query.sortBy,
    //   sortOrder: req.query.sortOrder,
    // };
    const filterss = pick(req.query, academicSemeterFilteringTermFiles);
    const paginationOptions = pick(req.query, paginationFiles);
    const result = await AcademicSemesterService.getAllSemsters(
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

    next();
  }
);

export const AcademicSemesterController = {
  createAcademicsemester,
  geteAllSemesters,
};
