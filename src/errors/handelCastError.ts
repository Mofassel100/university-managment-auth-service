import mongoose from 'mongoose';
import { IGenericErrorMessage } from '../interfaces/error';

const handelCastError = (error: mongoose.Error.CastError) => {
  const errors: IGenericErrorMessage[] = [
    {
      path: error.path,
      message: 'Invalid Id',
    },
  ];

  const statusCode = 400;
  return {
    statusCode,
    message: 'CAst Error',
    errorMessages: errors,
  };
};
export default handelCastError;
