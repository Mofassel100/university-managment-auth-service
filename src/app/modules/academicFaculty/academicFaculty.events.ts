import { RedisClinet } from '../../../shared/redis';
import { AcademicFacultyService } from './academicFacult.Service';
import {
  EVENT_ACADEMIC_FACULTY_CREATED,
  EVENT_ACADEMIC_FACULTY_GET_ALL,
  EVENT_ACADEMIC_FACULTY_GET_DELETED,
  EVENT_ACADEMIC_FACULTY_GET_SINGLE,
  EVENT_ACADEMIC_FACULTY_UPDATED,
} from './academicFacult.constant';

const initAcademicFacultyEvents = async () => {
  RedisClinet.subscriber(EVENT_ACADEMIC_FACULTY_CREATED, e => {
    const data = JSON.parse(e);
    AcademicFacultyService.createFacultyEvents(data);
    console.log('create faculty data :', data);
  });
  RedisClinet.subscriber(EVENT_ACADEMIC_FACULTY_UPDATED, e => {
    const data = JSON.parse(e);
    AcademicFacultyService.UpdateOneIntoDBEvents(data);
    console.log('updated faculty data : ', data);
  });
  RedisClinet.subscriber(EVENT_ACADEMIC_FACULTY_GET_DELETED, e => {
    const data = JSON.parse(e);
    AcademicFacultyService.DeletedOneIntoDBEvents(data);
    console.log('Deleted faculty data : ', data);
  });
  RedisClinet.subscriber(EVENT_ACADEMIC_FACULTY_GET_ALL, e => {
    const data = JSON.parse(e);
    AcademicFacultyService.GetAllOneIntoDBEvents(data);
    console.log('get All FACULTY data : ', data);
  });
  RedisClinet.subscriber(EVENT_ACADEMIC_FACULTY_GET_SINGLE, e => {
    const data = JSON.parse(e);
    AcademicFacultyService.GetAllOneIntoDBEvents(data);
    console.log('get Single faculty data : ', data);
  });
};
export default initAcademicFacultyEvents;
