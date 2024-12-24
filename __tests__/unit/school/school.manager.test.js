const School = require('../../../managers/entities/school/school.manager');

describe('School', () => {
	let mockValidators = {
		school: {
			v1_createSchool: jest.fn(),
			v1_getSchools: jest.fn(),
			v1_updateSchool: jest.fn(),
		},
	};

	let mockMongoModels = {
		school: {
			create: jest.fn().mockReturnThis(),
			find: jest.fn().mockReturnThis(),
			countDocuments: jest.fn(),
			findByIdAndUpdate: jest.fn().mockReturnThis(),
			findByIdAndDelete: jest.fn().mockReturnThis(),
			findById: jest.fn().mockReturnThis(),
			select: jest.fn().mockReturnThis(),
			skip: jest.fn().mockReturnThis(),
			limit: jest.fn().mockReturnThis(),
		},
	};

	let school = new School({
		config: {},
		validators: mockValidators,
		mongomodels: mockMongoModels,
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	describe('v1_createSpace', () => {
		it('should create a school successfully', async () => {
			const mockData = {
				name: 'schoolName',
				address: 'st,egypt',
				phone: '1234567890132',
				email: 'test@test.com',
			};
			const mockCreatedSchool = { _id: '1', ...mockData };

			mockValidators.school.v1_createSchool.mockResolvedValue(null);
			mockMongoModels.school.create.mockResolvedValue(mockCreatedSchool);

			const result = await school.v1_createSchool({ __shortToken: { role: 'SUPER_ADMIN' }, ...mockData });

			expect(result).toEqual({
				school: {
					...mockCreatedSchool,
				},
			});

			expect(mockValidators.school.v1_createSchool).toHaveBeenCalledWith(mockData);
			expect(mockMongoModels.school.create).toHaveBeenCalledWith(mockData);
		});
	});

	describe('v1_getSchools', () => {
		it('should get schools successfully', async () => {
			const mockQuery = { limit: 2, page: 1 };
			const mockSchools = [
				{ _id: '1', name: 'School 1', email: 'school1@test.com', address: 'Address 1', phone: '111' },
				{ _id: '2', name: 'School 2', email: 'school2@test.com', address: 'Address 2', phone: '222' },
			];
			const totalCount = 5;

			mockValidators.school.v1_getSchools.mockResolvedValue(null);
			mockMongoModels.school.countDocuments.mockResolvedValue(totalCount);
			mockMongoModels.school.find.mockReturnValue({
				skip: jest.fn().mockReturnValue({
					limit: jest.fn().mockReturnValue({
						select: jest.fn().mockReturnValue(mockSchools),
					}),
				}),
			})

			const result = await school.v1_getSchools({ __shortToken: { role: 'SUPER_ADMIN' }, __query: mockQuery });

			expect(result).toEqual({
				page: 1,
				totalCount: 5,
				count: 2,
				schools: mockSchools,
			});

			expect(mockValidators.school.v1_getSchools).toHaveBeenCalledWith(mockQuery);
			expect(mockMongoModels.school.countDocuments).toHaveBeenCalled();
		});

	});

	describe('v1_updateSchool', () => {
		it('should update a school successfully', async () => {
			const mockData = {
				name: 'newSchoolName',
				email: 'updated@test.com',
				address: 'address',
				phone: '1111122222333',
			};
			const mockSchool = { _id: '1', ...mockData };

			mockValidators.school.v1_updateSchool.mockResolvedValue(null);
			mockMongoModels.school.findByIdAndUpdate.mockResolvedValue(mockSchool);

			const result = await school.v1_updateSchool({
				__shortToken: { role: 'SUPER_ADMIN' },
				__query: { schoolId: '1' },
				...mockData,
			});

			expect(result).toEqual({
				school: {
					_id: '1',
					name: 'newSchoolName',
					email: 'updated@test.com',
					address: 'address',
					phone: '1111122222333',
				},
			});

			expect(mockValidators.school.v1_updateSchool).toHaveBeenCalledWith({
				...mockData,
				schoolId: '1',
			});
			expect(mockMongoModels.school.findByIdAndUpdate).toHaveBeenCalledWith('1', mockData, { new: true });
		});

		it('should return error if school not found during update', async () => {
			const mockData = {
				name: 'newSchoolName',
				email: 'updated@test.com',
				address: 'address',
				phone: '1111122222333',
			};

			mockValidators.school.v1_updateSchool.mockResolvedValue(null);
			mockMongoModels.school.findByIdAndUpdate.mockResolvedValue(null);

			await expect(
				await school.v1_updateSchool({
					__shortToken: { role: 'SUPER_ADMIN' },
					__query: { schoolId: '1' },
					...mockData,
				})
			).toEqual({ error: 'School not found', code: 404 });
		});
	});

	describe('v1_getSchool', () => {
		it('should get a school by ID successfully', async () => {
			const mockSchool = {
				_id: '1',
				name: 'schoolName',
				email: 'test@test.com',
				address: '123 Main St',
				phone: '1234567890',
			};

			mockMongoModels.school.findById.mockReturnValueOnce({ select: jest.fn().mockReturnValue(mockSchool) });


			const result = await school.v1_getSchool({ __shortToken: { role: 'SUPER_ADMIN' }, __query: { schoolId: '1' } });

			expect(result).toEqual({ school: mockSchool });
			expect(mockMongoModels.school.findById).toHaveBeenCalledWith('1');
		});

		it('should return error if school not found during get', async () => {
			mockMongoModels.school.findById.mockReturnValueOnce({ select: jest.fn().mockReturnValue(null) });


			const result = await school.v1_getSchool({ __shortToken: { role: 'SUPER_ADMIN' }, __query: { schoolId: '1' } });

			expect(result).toEqual({ error: 'School not found', code: 404 });
		});
	});

	describe('v1_deleteSchool', () => {
		it('should delete a school successfully', async () => {
			const mockSchool = {
				_id: '1',
				name: 'schoolName',
				email: 'test@test.com',
				address: '123 Main St',
				phone: '1234567890',
			};

			mockMongoModels.school.findByIdAndDelete.mockReturnValueOnce({ select: jest.fn().mockReturnValue(mockSchool) });

			const result = await school.v1_deleteSchool({ __shortToken: { role: 'SUPER_ADMIN' }, __query: { schoolId: '1' } });

			expect(result).toEqual({ deleted: true, school: mockSchool });
		});

		it('should return error if deleting a school fails', async () => {

			mockMongoModels.school.findByIdAndDelete.mockReturnValueOnce({ select: jest.fn().mockReturnValue(null) });

			mockMongoModels.school.findByIdAndDelete.mockResolvedValue(null);

			const result = await school.v1_deleteSchool({ __shortToken: { role: 'SUPER_ADMIN' }, __query: { schoolId: '1' } });

			expect(result).toEqual({ error: 'School not found', code: 404 });
		});
	});
});
