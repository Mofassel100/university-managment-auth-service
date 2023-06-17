import { Request, RequestHandler, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { UserService } from './user.service';
const createUser: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { user } = req.body;
    const result = await UserService.createUsers(user);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User Create Success Full',
      data: result,
    });
  }
);

export const UserController = { createUser };
