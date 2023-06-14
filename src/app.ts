import cors from 'cors';
import express, { Application } from 'express';
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
export default app;
