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
};
