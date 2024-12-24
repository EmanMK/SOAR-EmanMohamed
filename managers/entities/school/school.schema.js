const { default: mongoose } = require("mongoose");

module.exports = {
	v1_createSchool: [
		{
			model: 'name',
			required: true,
		},
		{
			model: 'phone',
		},
		{
			model: 'address',
			required: true,
		},
		{
			model: 'email',
			required: true,
		},
	],
	v1_getSchools: [
		{
			model: 'page',
		},
		{
			model: 'limit',
		},
	],
	v1_updateSchool: [
		{
			path: 'schoolId',
			type: 'string',
			required: true,
		},
		{
			model: 'name',
			required: true,
		},
		{
			model: 'phone',
		},
		{
			model: 'address',
			required: true,
		},
		{
			model: 'email',
			required: true,
		},
	],

	v1_getSchool: [
		{
			path: 'schoolId',
			type: 'string',
			required: true,
		},
	],

	v1_deleteSchool: [
		{
			path: 'schoolId',
			type: 'string',
			required: true,
		},
	],
};
