import initAcademicDepartmentEvents from '../modules/academicDepartment/academicDepartmentEvent';
import initAcademicFacultyEvents from '../modules/academicFaculty/academicFaculty.events';
import initAcademicSemesterEvents from '../modules/academicSemester/academicSemester.events';

const subscriberEvent = () => {
  initAcademicSemesterEvents();
  initAcademicFacultyEvents();
  initAcademicDepartmentEvents();
};
export default subscriberEvent;
