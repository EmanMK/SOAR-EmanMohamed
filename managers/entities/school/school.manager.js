const { allowedTo } = require("../../../helpers/allowedTo");

module.exports = class School {
	constructor({ config, validators, mongomodels } = {}) {
		this.config = config;
		this.validators = validators;
		this.mongomodels = mongomodels;

		this.httpExposed = [
			'v1_createSchool',
			'get=v1_getSchools',
			'get=v1_getSchool',
			'put=v1_updateSchool',
			'delete=v1_deleteSchool',
		];
	}

	async v1_createSchool({ __shortToken, name, address, phone, email }) {
		try {
			const space = { name, address, phone, email };
			let authRes = allowedTo(["SUPER_ADMIN"], __shortToken.role)
			if (authRes) return authRes;
			let result = await this.validators.school.v1_createSchool(space);
			if (result) return result;

			const createdSchool = await this.mongomodels.school.create({
				name,
				email,
				address,
				phone,
			});

			return {
				school: {
					_id: createdSchool._id,
					name: createdSchool.name,
					email: createdSchool.email,
					address: createdSchool.address,
					phone: createdSchool.phone,
				},
			};
		} catch (error) {
			return { error: `failed to create school` };
		}
	}

	async v1_getSchools({ __shortToken, __query }) {
		try {
			let { limit = '15', page = '1' } = __query;
			limit = Number(limit);
			page = Number(page);
			let authRes = allowedTo(["SUPER_ADMIN"], __shortToken.role)
			if (authRes) return authRes;

			let result = await this.validators.school.v1_getSchools({ limit, page });
			if (result) return result;

			const skip = (page - 1) * limit;

			const totalCount = await this.mongomodels.school.countDocuments();
			const schools = await this.mongomodels.school
				.find()
				.skip(skip)
				.limit(limit)
				.select('name email address phone _id');
			return { page, totalCount, count: schools.length, schools };
		} catch (error) {
			return { error: `failed to get schools` };
		}
	}

	async v1_updateSchool({ __shortToken, __query, name, email, address, phone, admins, classrooms, students }) {
		try {
			const { schoolId } = __query;
			const school = { name, email, address, phone };

			let authRes = allowedTo(["SUPER_ADMIN"], __shortToken.role)
			if (authRes) return authRes;
			let result = await this.validators.school.v1_updateSchool({ ...school, schoolId });
			if (result) return result;

			const updatedSchool = await this.mongomodels.school.findByIdAndUpdate(
				schoolId,
				{ name, email, address, phone },
				{ new: true }
			);

			if (!updatedSchool) {
				return { error: `School not found`, code: 404 };
			}
			return {
				school: {
					_id: updatedSchool._id,
					name: updatedSchool.name,
					email: updatedSchool.email,
					address: updatedSchool.address,
					phone: updatedSchool.phone,
				},
			};
		} catch (error) {
			return { error: `failed to update school` };
		}
	}

	async v1_getSchool({ __shortToken, __query }) {
		try {
			const { schoolId } = __query;
			let authRes = allowedTo(["SUPER_ADMIN"], __shortToken.role)
			if (authRes) return authRes;
			const school = await this.mongomodels.school.findById(schoolId).select('name email address phone _id');

			if (!school) return { error: 'School not found', code: 404 };

			return { school };
		} catch (error) {
			return { error: 'failed to get school' };
		}
	}

	async v1_deleteSchool({ __shortToken, __query }) {
		try {
			const { schoolId } = __query;
			let authRes = allowedTo(["SUPER_ADMIN"], __shortToken.role)
			if (authRes) return authRes;

			const deletedSchool = await this.mongomodels.school
				.findByIdAndDelete(schoolId)
				.select('name email address phone _id');


			if (!deletedSchool) {
				return { error: 'School not found', code: 404 };
			}

			return { deleted: true, school: deletedSchool };
		} catch (error) {
			return { error: 'faield to delete space' };
		}
	}
};
