import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import httpStatus from 'http-status';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import modulesRouters from './app/routes';

const app: Application = express();
app.use(cors());
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
app.use((req: Request, res: Response) => {
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
});
// const academisemester = {
//   year: '2025',
//   code: '01',
// };

// const datasss = async () => {
//   const datas = await generateStudentId(academisemester);
//   console.log(datas);
// };
// datasss();
export default app;
