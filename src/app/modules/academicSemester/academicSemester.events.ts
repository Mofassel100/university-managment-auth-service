import { RedisClinet } from '../../../shared/redis';
import { AcademicSemesterService } from './academicSemester.Service';
import {
  EVENT_ACADEMIC_SEMESTER_CREATED,
  EVENT_ACADEMIC_SEMESTER_GET_ALL,
  EVENT_ACADEMIC_SEMESTER_GET_DELETED,
  EVENT_ACADEMIC_SEMESTER_GET_SINGLE,
  EVENT_ACADEMIC_SEMESTER_UPDATED,
} from './academicSemester.constant';

const initAcademicSemesterEvents = async () => {
  RedisClinet.subscriber(EVENT_ACADEMIC_SEMESTER_CREATED, e => {
    const data = JSON.parse(e);
    AcademicSemesterService.createSemesterEvents(data);
    console.log('create data :', data);
  });
  RedisClinet.subscriber(EVENT_ACADEMIC_SEMESTER_UPDATED, e => {
    const data = JSON.parse(e);
    AcademicSemesterService.UpdateOneIntoDBEvents(data);
    console.log('updated data : ', data);
  });
  RedisClinet.subscriber(EVENT_ACADEMIC_SEMESTER_GET_DELETED, e => {
    const data = JSON.parse(e);
    AcademicSemesterService.DeletedOneIntoDBEvents(data);
    console.log('Deleted data : ', data);
  });
  RedisClinet.subscriber(EVENT_ACADEMIC_SEMESTER_GET_ALL, e => {
    const data = JSON.parse(e);
    AcademicSemesterService.GetAllOneIntoDBEvents(data);
    console.log('get All data : ', data);
  });
  RedisClinet.subscriber(EVENT_ACADEMIC_SEMESTER_GET_SINGLE, e => {
    const data = JSON.parse(e);
    AcademicSemesterService.GetAllOneIntoDBEvents(data);
    console.log('get Single data : ', data);
  });
};
export default initAcademicSemesterEvents;
