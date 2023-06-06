import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import userRouter from './app/modules/users/user.router'
const app: Application = express()
app.use(cors())
// perser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// application used
app.use('/api/v1/users/', userRouter)
app.get('/', async (req: Request, res: Response) => {
  res.send('Working succefull start')
})

export default app
