
import express, { Application, NextFunction, Request, Response } from "express"
import cors from "cors"
const app : Application = express()
app.use(cors())
// perser
app.use(express.json())
app.use(express.urlencoded({extended:true}))

const port : number = 4000;
app.get('/', (req :Request ,res :Response,next:NextFunction) => {
  res.send('Working succefull start')
})

export default app
