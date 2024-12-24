module.exports = {
	v1_createStudent: [
		{
			model: 'firstName',
			required: true,
		},
		{
			model: 'lastName',
			required: true,
		},
		{
			model: 'dateOfBirth',
			required: true,
		},
		{
			path: 'school',
			type: 'String',
			required: true,
		},
		{
			path: 'classrooms',
			required: false,
			type: 'array',
		}
	],

	v1_getStudents: [
		{
			model: 'limit',
			required: false,
		},
		{
			model: 'page',
			required: false,
		},
	],

	v1_getStudent: [
		{
			path: 'studentId',
			type: 'String',
			required: true,
		},
	],

	v1_updateStudent: [
		{
			path: 'studentId',
			type: 'String',
			required: true,
		},
		{
			model: 'firstName',
			required: false,
		},
		{
			model: 'lastName',
			required: false,
		},
		{
			model: 'dateOfBirth',
			required: false,
			type: 'date',
		},
		{
			path: 'school',
			type: 'String',
			required: true,
		},
		{
			path: 'classrooms',
			required: false,
			type: 'array',
		}
	],

	v1_deleteStudent: [
		{
			path: 'studentId',
			type: 'String',
			required: true,
		},
	],
};
