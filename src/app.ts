import express, { Application, Request, Response } from 'express'
import cors from 'cors'
const app: Application = express()
app.use(cors())
// perser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req: Request, res: Response) => {
  res.send('Working succefull start')
})

export default app
