import initAcademicFacultyEvents from '../modules/academicFaculty/academicFaculty.events';
import initAcademicSemesterEvents from '../modules/academicSemester/academicSemester.events';

const subscriberEvent = () => {
  initAcademicSemesterEvents();
  initAcademicFacultyEvents();
};
export default subscriberEvent;
