const { allowedTo } = require("../../../helpers/allowedTo");

module.exports = class Student {
	constructor({ config, validators, mongomodels } = {}) {
		this.config = config;
		this.validators = validators;
		this.mongomodels = mongomodels;

		this.httpExposed = [
			'v1_createStudent',
			'get=v1_getStudents',
			'get=v1_getStudent',
			'put=v1_updateStudent',
			'delete=v1_deleteStudent',
		];
	}

	async v1_createStudent({ __shortToken, firstName, lastName, dateOfBirth, school, classrooms, profilePicture }) {
		try {
			let authRes = allowedTo(["SCHOOL_ADMIN"], __shortToken.role)
			if (authRes) return authRes;

			const student = { firstName, lastName, dateOfBirth, school, classrooms };
			let result = await this.validators.student.v1_createStudent(student);
			if (result) return result;

			const createdStudent = await this.mongomodels.student.create({
				firstName,
				lastName,
				dateOfBirth,
				school,
				classrooms,
				profilePicture,
			});

			return {
				student: {
					_id: createdStudent._id,
					firstName: createdStudent.firstName,
					lastName: createdStudent.lastName,
					dateOfBirth: createdStudent.dateOfBirth,
					school: createdStudent.school,
					classrooms: createdStudent.classrooms,
					profilePicture: createdStudent.profilePicture,
				},
			};
		} catch (error) {
			return { error: `failed to create student`, code: 500 };
		}
	}

	async v1_getStudents({ __shortToken, __query }) {
		try {
			let authRes = allowedTo(["SCHOOL_ADMIN"], __shortToken.role)
			if (authRes) return authRes;

			let { limit = '15', page = '1' } = __query;
			limit = Number(limit);
			page = Number(page);

			let result = await this.validators.student.v1_getStudents({ limit, page });
			if (result) return result;

			const skip = (page - 1) * limit;

			const totalCount = await this.mongomodels.student.countDocuments();
			const students = await this.mongomodels.student
				.find()
				.skip(skip)
				.limit(limit)
				.select('firstName lastName dateOfBirth school profilePicture _id');
			return { page, totalCount, count: students.length, students };
		} catch (error) {
			return { error: `failed to get students`, code: 500 };
		}
	}

	async v1_updateStudent({
		__shortToken,
		__query,
		firstName,
		lastName,
		dateOfBirth,
		school,
		classrooms,
		profilePicture,
	}) {
		try {
			let authRes = allowedTo(["SCHOOL_ADMIN"], __shortToken.role)
			if (authRes) return authRes;

			const { studentId } = __query;
			const student = { firstName, lastName, dateOfBirth, school, classrooms };
			let result = await this.validators.student.v1_updateStudent({ ...student, studentId });
			if (result) return result;

			const updatedStudent = await this.mongomodels.student.findByIdAndUpdate(
				studentId,
				{ firstName, lastName, dateOfBirth, school, classrooms },
				{ new: true }
			);

			if (!updatedStudent) {
				return { error: `Student not found`, code: 404 };
			}
			return {
				student: {
					_id: updatedStudent._id,
					firstName: updatedStudent.firstName,
					lastName: updatedStudent.lastName,
					dateOfBirth: updatedStudent.dateOfBirth,
					school: updatedStudent.school,
					classrooms: updatedStudent.classrooms,
					profilePicture: updatedStudent.profilePicture,
				},
			};
		} catch (error) {
			return { error: `failed to update student` };
		}
	}

	async v1_getStudent({ __shortToken, __query }) {
		try {
			let authRes = allowedTo(["SCHOOL_ADMIN"], __shortToken.role)
			if (authRes) return authRes;

			const { studentId } = __query;
			const student = await this.mongomodels.student
				.findById(studentId)
				.select('firstName lastName dateOfBirth school profilePicture _id');

			if (!student) return { error: 'Student not found', code: 404 };

			return { student };
		} catch (error) {
			return { error: 'failed to get student', code: 500 };
		}
	}

	async v1_deleteStudent({ __shortToken, __query }) {
		try {
			let authRes = allowedTo(["SCHOOL_ADMIN"], __shortToken.role)
			if (authRes) return authRes;

			const { studentId } = __query;
			const deletedStudent = await this.mongomodels.student
				.findByIdAndDelete(studentId)
				.select('firstName lastName dateOfBirth school profilePicture _id');

			if (!deletedStudent) {
				return { error: 'Student not found', code: 404 };
			}

			return { deleted: true, student: deletedStudent };
		} catch (error) {
			return { error: 'failed to delete student', code: 500 };
		}
	}
};
