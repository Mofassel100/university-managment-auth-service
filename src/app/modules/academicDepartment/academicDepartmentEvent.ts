// import { RedisClinet } from '../../../shared/redis';
// import { AcademicSemesterService } from './academicSemester.Service';
// import { EVENT_ACADEMIC_SEMESTER_CREATED } from './academicSemester.constant';

// const initAcademicDepartmentEvents = async () => {
//   RedisClinet.subscriber(EVENT_ACADEMIC_SEMESTER_CREATED, e => {
//     const data = JSON.parse(e);
//     AcademicSemesterService.createSemesterEvents(data);
//     console.log(data);
//   });
// };
// export default initAcademicDepartmentEvents;
