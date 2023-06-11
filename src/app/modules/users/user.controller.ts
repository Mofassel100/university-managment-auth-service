import { RequestHandler } from 'express'
import { UserService } from './user.service'

const createUser: RequestHandler = async (req, res, next) => {
  try {
    const { user } = req.body
    const result = await UserService.createUsers(user)
    res.status(200).json({
      success: true,
      message: `user created successfull`,
      data: result,
    })
    // dkk
  } catch (err) {
    // res.status(400).json({
    //   success: false,
    //   message: `Failed to created user`,
    // })
    next(err)
  }
}
export const UserController = { createUser }
