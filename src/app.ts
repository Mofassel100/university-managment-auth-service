import express, { Application } from 'express'
import cors from 'cors'
import { UserRouter } from './app/modules/users/user.router'
import globalErrorHandler from './app/middlewares/globalErrorHandler'

const app: Application = express()
app.use(cors())
// perser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// application used
app.use('/api/v1/users/', UserRouter)
//Testing
// app.get('/', (req: Request, res: Response, next: NextFunction) => {
//   throw new Error('Testing Error logger')
// })
app.use(globalErrorHandler)
export default app
