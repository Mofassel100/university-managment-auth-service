import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { AcademicSemesterService } from './academicSemester.Service';
const createAcademicsemester = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { ...academicSemesteData } = req.body;
    const result = await AcademicSemesterService.createSemester(
      academicSemesteData
    );
    next();
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'AcademicSemester Data create Success Full',
      data: result,
    });
    // res.status(200).json({
    //   success: true,
    //   message: `Academic Semester create successfull`,
    //   data: result,
    // });
  }
);

export const AcademicSemesterController = { createAcademicsemester };
