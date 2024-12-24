module.exports = {
	v1_createClassroom: [
		{
			model: 'schoolId',
			required: true,
		},
		{
			model: 'name',
			required: true,
		},
		{
			model: 'capacity',
			required: true,
			type: 'number',
		},
		{
			path: 'students',
			required: false,
			type: 'array',
		}
	],

	v1_getClassrooms: [
		{
			model: 'limit',
			required: false,
		},
		{
			model: 'page',
			required: false,
		},
	],

	v1_getClassroom: [
		{
			model: 'classroomId',
			required: true,
		},
	],

	v1_updateClassroom: [
		{
			model: 'classroomId',
			required: true,
		},
		{
			model: 'name',
			required: false,
		},
		{
			path: 'capacity',
			type:'number',
			required: true,
		},
		{
			model: 'students',
			required: false,
		},
	],

	v1_deleteClassroom: [
		{
			model: 'classroomId',
			required: true,
		},
	],
};
