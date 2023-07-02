import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Application, NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import modulesRouters from './app/routes';
const app: Application = express();
app.use(cors());
// cookie-parse
app.use(cookieParser());
// perser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// application used
app.use('/api/v1', modulesRouters);
//Testing
// app.get('/', (req: Request, res: Response, next: NextFunction) => {
//   throw new Error('Testing Error logger')
// })
app.use(globalErrorHandler);
// handle not found
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Not found ',
    errorMessages: [
      {
        path: req.originalUrl,
        message: 'API Not Found',
      },
    ],
  });
  next();
});

// const test = async () => {
//   const datas = await generateAdminId();
//   console.log(datas);
// };
// test();
export default app;
