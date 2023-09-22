import { RedisClinet } from '../../../shared/redis';
import {
  EVENT_ACADEMIC_DEPARTMENT_CREATED,
  EVENT_ACADEMIC_DEPARTMENT_GET_ALL,
  EVENT_ACADEMIC_DEPARTMENT_GET_DELETED,
  EVENT_ACADEMIC_DEPARTMENT_GET_SINGLE,
  EVENT_ACADEMIC_DEPARTMENT_UPDATED,
} from './academicDepartment.constant';
import {
  AcademicDepartmentCreatedEvent,
  AcademicDepartmentDeletedEvent,
  AcademicDepartmentUpdatedEvent,
} from './academicDepartment.interface';
import { AcademicDepartmentService } from './academicDepartment.service';

const initAcademicDepartmentEvents = async () => {
  RedisClinet.subscriber(EVENT_ACADEMIC_DEPARTMENT_CREATED, e => {
    const data: AcademicDepartmentCreatedEvent = JSON.parse(e);
    AcademicDepartmentService.createDepartmentEvents(data);
    console.log('create Department data :', data);
  });
  RedisClinet.subscriber(EVENT_ACADEMIC_DEPARTMENT_UPDATED, e => {
    const data: AcademicDepartmentUpdatedEvent = JSON.parse(e);
    AcademicDepartmentService.UpdateOneIntoDBEvents(data);
    console.log('updated DEPARTMENT_ data : ', data);
  });
  RedisClinet.subscriber(EVENT_ACADEMIC_DEPARTMENT_GET_DELETED, e => {
    const data: AcademicDepartmentDeletedEvent = JSON.parse(e);
    AcademicDepartmentService.DeletedOneIntoDBEvents(data);
    console.log('Deleted DEPARTMENT data : ', data);
  });
  RedisClinet.subscriber(EVENT_ACADEMIC_DEPARTMENT_GET_ALL, e => {
    const data = JSON.parse(e);
    AcademicDepartmentService.GetAllOneIntoDBEvents(data);
    console.log('get All DEPARTMENT data : ', data);
  });
  RedisClinet.subscriber(EVENT_ACADEMIC_DEPARTMENT_GET_SINGLE, e => {
    const data = JSON.parse(e);
    AcademicDepartmentService.GetAllOneIntoDBEvents(data);
    console.log('get Single DEPARTMENT data : ', data);
  });
};
export default initAcademicDepartmentEvents;
