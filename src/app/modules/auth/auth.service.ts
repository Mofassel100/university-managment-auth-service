import httpStatus from 'http-status';
import { JwtPayload, Secret } from 'jsonwebtoken';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { jwtHelpers } from '../../../helpars/jwtHelpers';
import { User } from '../users/user.model';
import {
  IChangePassword,
  ILoginUserResponse,
  IRefreshTokenResponse,
  lLoginUser,
} from './auth.interface';

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
const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
  let verifyToken = null;
  try {
    verifyToken = jwtHelpers.VerifyToken(
      token,
      config.jwt.jwt_refresh_secret as Secret
    );
  } catch (err) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Inviled token');
    // err
  }
  const { userId } = verifyToken;
  // tumi delete hye gseo kinty tumar refresh token ase
  // cheking deleted user's refresh token
  const isUserExist = await User.isUserExist(userId);
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }
  // generate new token
  const newAccessToken = jwtHelpers.createToken(
    { id: isUserExist.id, role: isUserExist.role },
    config.jwt.secret as Secret,
    config.jwt.jwt_expires_in as string
  );
  return {
    accessToken: newAccessToken,
  };
};
// change password auth service
const changePassword = async (
  user: JwtPayload | null,
  payload: IChangePassword
): Promise<void> => {
  const { oldPassword, newPassword } = payload;
  // checking is user exist
  // const isUserExist = await User.isUserExist(user?.userId);
  const isUserExist = await User.findOne({ id: user?.userId }).select(
    '+password'
  );
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }
  // checking old password
  if (
    isUserExist.password &&
    !(await User.isPasswordMatched(oldPassword, isUserExist?.password))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect');
  }
  // hash passsword before saving
  // const newHashedPassword = await bcrypt.hash(
  //   newPassword,
  //   Number(config.bcrypt_salt_rounds)
  // );
  // update password
  // const query = { id: user?.userId };
  // const updatedData = {
  //   password: newHashedPassword,
  //   needsPasswordChange: false,
  //   passwordChangedAt: new Date(),
  // };
  // update password find and update
  // await User.findOneAndUpdate(query, updatedData);
  isUserExist.password = newPassword;
  isUserExist.needsPasswordChange = false;
  // updating sing save
  isUserExist.save();
};
export const AuthService = {
  loginUser,
  refreshToken,
  changePassword,
};
