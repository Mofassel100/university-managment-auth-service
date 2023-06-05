import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import userService from './app/modules/users/user.service'
const app: Application = express()
app.use(cors())
// perser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', async (req: Request, res: Response) => {
  await userService.createUsers({
    id: '00001',
    password: 'mofassel@',
    role: 'Mofassel',
  })
  res.send('Working succefull start')
})

export default app
