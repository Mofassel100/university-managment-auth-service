import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.join(process.cwd(), '.env') });
export default {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  defualt_student_pass: process.env.DEFUALD_STUDENT_PASS,
  defualt_faculty_pass: process.env.DEFUALD_FACULTY_PASSS,
  defualt_admin_pass: process.env.DEFUALD_ADMIN_PASSS,
  bcrypt_salt_rounds: process.env.BCRPT_SALT_ROUNDS,
  jwt: {
    secret: process.env.JWT_SECRET,
    jwt_expires_in: process.env.JWT_EXPIRES_IN,
    jwt_refresh_secret: process.env.JWT_REFRESH_SECRET,
    refresh_expires_in: process.env.JWT_REFRESH_EXPIRES_IN,
  },
};
