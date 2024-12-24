const { allowedTo } = require("../../../helpers/allowedTo");

module.exports = class Classroom {
	constructor({ config, validators, mongomodels } = {}) {
		this.config = config;
		this.validators = validators;
		this.mongomodels = mongomodels;

		this.httpExposed = [
			'v1_createClassroom',
			'get=v1_getClassrooms',
			'get=v1_getClassroom',
			'put=v1_updateClassroom',
			'delete=v1_deleteClassroom',
		];
	}

	async v1_createClassroom({ __shortToken, schoolId, name, capacity, students }) {
		try {
			let authRes = allowedTo(["SCHOOL_ADMIN"], __shortToken.role)
			if (authRes) return authRes;

			const space = { schoolId, name, capacity, students };
			let result = await this.validators.classroom.v1_createClassroom(space);
			if (result) return result;

			const createdClassroom = await this.mongomodels.classroom.create({
				school: schoolId,
				name,
				capacity,
				students,
			});

			return {
				classroom: {
					_id: createdClassroom._id,
					name: createdClassroom.name,
					school: createdClassroom.school,
					capacity: createdClassroom.capacity,
					students: createdClassroom.students,
				},
			};
		} catch (error) {
			return { error: `failed to create classroom`, code: 500 };
		}
	}

	async v1_getClassrooms({ __shortToken, __query }) {
		try {
			let authRes = allowedTo(["SCHOOL_ADMIN"], __shortToken.role)
			if (authRes) return authRes;

			let { limit = '15', page = '1' } = __query;
			limit = Number(limit);
			page = Number(page);

			let result = await this.validators.classroom.v1_getClassrooms({ limit, page });
			if (result) return result;

			const skip = (page - 1) * limit;

			const totalCount = await this.mongomodels.classroom.countDocuments();
			const classrooms = await this.mongomodels.classroom
				.find()
				.skip(skip)
				.limit(limit)
				.select('name school capacity students _id');
			return { page, totalCount, count: classrooms.length, classrooms };
		} catch (error) {
			return { error: `failed to get classrooms`, code: 500 };
		}
	}

	async v1_getClassroom({ __shortToken, __query }) {
		try {
			let authRes = allowedTo(["SCHOOL_ADMIN"], __shortToken.role)
			if (authRes) return authRes;

			const { classroomId } = __query;
			const classroom = await this.mongomodels.classroom
				.findById(classroomId)
				.select('name school capacity students _id');

			if (!classroom) return { error: 'Classroom not found', code: 404 };

			return { classroom };
		} catch (error) {
			return { error: 'failed to get classroom' };
		}
	}

	async v1_updateClassroom({ __shortToken, __query, name, capacity, students }) {
		try {
			let authRes = allowedTo(["SCHOOL_ADMIN"], __shortToken.role)
			if (authRes) return authRes;

			const { classroomId } = __query;
			const classroom = { name, capacity, students };

			let result = await this.validators.classroom.v1_updateClassroom({ ...classroom, classroomId });
			if (result) return result;

			const updatedClassroom = await this.mongomodels.classroom.findByIdAndUpdate(
				classroomId,
				{ name, capacity, students },
				{ new: true }
			);

			if (!updatedClassroom) {
				return { error: `Classroom not found`, code: 404 };
			}
			return {
				classroom: {
					_id: updatedClassroom._id,
					name: updatedClassroom.name,
					school: updatedClassroom.school,
					capacity: updatedClassroom.capacity,
					students: updatedClassroom.students,
				},
			};
		} catch (error) {
			return { error: `failed to update classroom`, code: 500 };
		}
	}

	// Delete a classroom by ID
	async v1_deleteClassroom({ __shortToken, __query }) {
		try {

			let authRes = allowedTo(["SCHOOL_ADMIN"], __shortToken.role)
			if (authRes) return authRes;

			const { classroomId } = __query;
			const deletedClassroom = await this.mongomodels.classroom
				.findByIdAndDelete(classroomId)
				.select('name school capacity students _id');

			if (!deletedClassroom) {
				return { error: 'Classroom not found', code: 404 };
			}

			return { deleted: true, classroom: deletedClassroom };
		} catch (error) {
			return { error: 'failed to delete classroom', code: 500 };
		}
	}
};
