import { RedisClinet } from '../../../shared/redis';
import { AcademicSemesterService } from './academicSemester.Service';
import {
  EVENT_ACADEMIC_SEMESTER_CREATED,
  EVENT_ACADEMIC_SEMESTER_UPDATED,
} from './academicSemester.constant';

const initAcademicSemesterEvents = async () => {
  RedisClinet.subscriber(EVENT_ACADEMIC_SEMESTER_CREATED, e => {
    const data = JSON.parse(e);
    AcademicSemesterService.createSemesterEvents(data);
    console.log(data);
  });
  RedisClinet.subscriber(EVENT_ACADEMIC_SEMESTER_UPDATED, e => {
    const data = JSON.parse(e);
    AcademicSemesterService.UpdateOneIntoDBEvents(data);
    console.log('updated data : ', data);
  });
};
export default initAcademicSemesterEvents;
