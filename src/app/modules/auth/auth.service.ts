import httpStatus from 'http-status';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { jwtHelpers } from '../../../helpars/jwtHelpers';
import { User } from '../users/user.model';
import { ILoginUserResponse, lLoginUser } from './auth.interface';

const loginUser = async (payload: lLoginUser): Promise<ILoginUserResponse> => {
  const { id, password } = payload;
  // check user exist
  // const user = new User();
  // User.isUserExist
  const isUserExist = await User.isUserExist(id);

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'user does not exist');
  }
  // match password
  // const isPasswordMatched = await bcrypt.compare(
  //   password,
  //   isUserExist?.password
  // );
  if (
    isUserExist.password &&
    !(await User.isPasswordMatched(password, isUserExist?.password))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect');
  }
  // access token and refresh token
  const { id: userId, role, needsPasswordChange } = isUserExist;
  const accessToken = jwtHelpers.createToken(
    { userId, role },
    config.jwt.secret as string,
    config.jwt.jwt_expires_in as string
  );
  const refreshToken = jwtHelpers.createToken(
    { userId, role },
    config.jwt.jwt_refresh_secret as string,
    config.jwt.refresh_expires_in as string
  );
  return {
    accessToken,
    refreshToken,
    needsPasswordChange,
  };
};
export const AuthService = {
  loginUser,
};
