import { Request, Response } from 'express'
import userService from './user.service'

const createUser = async (req: Request, res: Response) => {
  try {
    const { user } = req.body
    const result = await userService.createUsers(user)
    res.status(200).json({
      success: true,
      message: `user created successfull`,
      data: result,
    })
  } catch (err) {
    res.status(400).json({
      success: false,
      message: `Failed to created user`,
    })
  }
}
export default createUser
