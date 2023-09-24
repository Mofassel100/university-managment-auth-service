export const gender = ['male', 'female'];
export const bloodGroup = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

export const FacultySearchableFields = [
  'id',
  'email',
  'contactNo',
  'name.fisrtName',
  'name.middleName',
  'name.lastName',
];

export const FacultyFilterableFields = [
  'searchTerm',
  'id',
  'bloodGroup',
  'email',
  'contactNo',
  'emergencyContactNo',
];
export const EVENT_CREATED_FACULTY = 'created.faculty';
export const EVENT_UPDATED_FACULTY = 'update.faculty';
export const EVENT_GET_ALL_FACULTY = 'faculty-get.facultys';
export const EVENT_GET_SINGLE_FACULTY = 'faculty-get.signlefaculty';
export const EVENT_DELETE_FACULTY = 'faculty.deleted';
