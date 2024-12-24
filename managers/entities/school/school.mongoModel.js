const mongoose = require('mongoose');

const schoolSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	address: {
		type: String,
		required: true,
	},
	phone: {
		type: String,
		required: true,
	},
	admins: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
	],
	classrooms: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Classroom',
		},
	],
	students: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Student',
		},
	],
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

const School = mongoose.model('School', schoolSchema);

module.exports = School;
