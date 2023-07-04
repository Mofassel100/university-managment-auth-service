import { Response } from 'express';
type IAResponseData<T> = {
  statusCode: number;
  success: boolean;
  message?: string | null;
  meta?: {
    page: number;
    limit: number;
    total: number;
  };
  data?: T | null;
};
const sendResponse = <T>(res: Response, data: IAResponseData<T>): void => {
  const responseData: IAResponseData<T> = {
    statusCode: data.statusCode,
    success: data.success,
    message: data.message || null,
    meta: data.meta || null || undefined,
    data: data.data || null || undefined,
  };
  res.status(data.statusCode).json(responseData);
};
export default sendResponse;
