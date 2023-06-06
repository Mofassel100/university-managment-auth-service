import config from '../../../config/index'
import { IUser } from './user.interface'
import { User } from './user.model'
import { generateUserId } from './user.utilis'

const createUsers = async (user: IUser): Promise<IUser | null> => {
  // auth generated increament password
  const id = await generateUserId()
  user.id = id
  // DEFUALD PASSWORD
  if (!user.password) {
    user.password = config.defualt_user_pass as string
  }
  const createUser = await User.create(user)
  if (!createUser) {
    throw new Error('Failed to create user')
  }
  return createUser
}
export default {
  createUsers,
}
