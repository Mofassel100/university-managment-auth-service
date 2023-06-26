import { Schema, model } from 'mongoose';
import { IUser, UserModel } from './user.interface';
const UserSchema = new Schema<IUser>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    // _needsPasswordChange: {
    //   type: Boolean,
    //   default: true,
    // },
    // get needsPasswordChange() {
    //   return this._needsPasswordChange;
    // },
    // set needsPasswordChange(value) {
    //   this._needsPasswordChange = value;
    // },
    student: {
      type: Schema.Types.ObjectId,
      ref: 'student',
    },
    // faculty: {
    //   type: Schema.Types.ObjectId,
    //   ref: 'Faculty',
    // },
    //   admin: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'Admin',
    //   },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);
export const User = model<IUser, UserModel>('user', UserSchema);
// UserSchema.statics.isUserExist = async function (
//   id: string
// ): Promise<Pick<
//   IUser,
//   'id' | 'password' | 'role' | 'needsPasswordChange'
// > | null> {
//   return await User.findOne(
//     { id },
//     { id: 1, password: 1, role: 1, needsPasswordChange: 1 }
//   );
// };

// UserSchema.statics.isPasswordMatched = async function (
//   givenPassword: string,
//   savedPassword: string
// ): Promise<boolean> {
//   return await bcrypt.compare(givenPassword, savedPassword);
// };

// User.create() / user.save()
// UserSchema.pre('save', async function (next) {
//   // hashing user password
//   //   const user = this;
//   //   user.password = await bcrypt.hash(
//   //     user.password,
//   //     Number(config.bycrypt_salt_rounds)
//   //   );
//   next();
// });
