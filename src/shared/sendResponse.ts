import { Response } from 'express';
type IAResponseData<T> = {
  statusCode: number;
  success: boolean;
  message?: string | null;
  data?: T | null;
};
const sendResponse = <T>(res: Response, data: IAResponseData<T>): void => {
  const datas: IAResponseData<T> = {
    statusCode: data.statusCode,
    success: data.success,
    data: data.data || null,
  };
  res.status(data.statusCode).json(datas);
};
export default sendResponse;
