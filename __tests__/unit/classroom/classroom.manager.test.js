const Classroom = require('../../../managers/entities/classroom/classroom.manager');

describe('Classroom Manager', () => {
    let mockValidators = {
        classroom: {
            v1_createClassroom: jest.fn(),
            v1_getClassrooms: jest.fn(),
            v1_getClassroom: jest.fn(),
            v1_updateClassroom: jest.fn(),
        },
    };

    let mockMongoModels = {
        classroom: {
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

    let classroom = new Classroom({
        config: {},
        validators: mockValidators,
        mongomodels: mockMongoModels,
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('v1_createClassroom', () => {
        it('should create a classroom successfully', async () => {
            const mockData = {
                schoolId: '123',
                name: 'Classroom 1',
                capacity: 30,
                students: ['student1', 'student2'],
            };
            const mockCreatedClassroom = { _id: '1', ...mockData };

            mockValidators.classroom.v1_createClassroom.mockResolvedValue(null);
            mockMongoModels.classroom.create.mockResolvedValue(mockCreatedClassroom);

            const result = await classroom.v1_createClassroom({ __shortToken: { role: 'SCHOOL_ADMIN' }, ...mockData });

            expect(result).toEqual({
                classroom: {
                    _id: mockCreatedClassroom._id,
                    name: mockCreatedClassroom.name,
                    school: mockCreatedClassroom.school,
                    capacity: mockCreatedClassroom.capacity,
                    students: mockCreatedClassroom.students,
                },
            });

            expect(mockValidators.classroom.v1_createClassroom).toHaveBeenCalledWith(mockData);
            expect(mockMongoModels.classroom.create).toHaveBeenCalledWith({
                school: mockData.schoolId,
                name: mockData.name,
                capacity: mockData.capacity,
                students: mockData.students,
            });
        });

    });

    describe('v1_getClassrooms', () => {
        it('should get classrooms successfully', async () => {
            const mockQuery = { limit: 2, page: 1 };
            const mockClassrooms = [
                { _id: '1', name: 'Classroom 1', school: '123', capacity: 30, students: ['student1'] },
                { _id: '2', name: 'Classroom 2', school: '123', capacity: 25, students: ['student2'] },
            ];
            const totalCount = 5;

            mockValidators.classroom.v1_getClassrooms.mockResolvedValue(null);
            mockMongoModels.classroom.countDocuments.mockResolvedValue(totalCount);
            mockMongoModels.classroom.find.mockReturnValue({
                skip: jest.fn().mockReturnValue({
                    limit: jest.fn().mockReturnValue({
                        select: jest.fn().mockReturnValue(mockClassrooms),
                    }),
                }),
            });

            const result = await classroom.v1_getClassrooms({ __shortToken: { role: 'SCHOOL_ADMIN' }, __query: mockQuery });

            expect(result).toEqual({
                page: 1,
                totalCount: 5,
                count: 2,
                classrooms: mockClassrooms,
            });

            expect(mockValidators.classroom.v1_getClassrooms).toHaveBeenCalledWith(mockQuery);
            expect(mockMongoModels.classroom.countDocuments).toHaveBeenCalled();
        });

    });

    describe('v1_getClassroom', () => {
        it('should get a classroom by ID successfully', async () => {
            const mockClassroom = { _id: '1', name: 'Classroom 1', school: '123', capacity: 30, students: ['student1'] };

            mockMongoModels.classroom.findById.mockReturnValue({ select: jest.fn().mockReturnValue(mockClassroom) });

            const result = await classroom.v1_getClassroom({ __shortToken: { role: 'SCHOOL_ADMIN' }, __query: { classroomId: '1' } });

            expect(result).toEqual({ classroom: mockClassroom });
            expect(mockMongoModels.classroom.findById).toHaveBeenCalledWith('1');
        });

        it('should return error if classroom not found during get', async () => {
            mockMongoModels.classroom.findById.mockReturnValue({ select: jest.fn().mockReturnValue(null) });

            const result = await classroom.v1_getClassroom({ __shortToken: { role: 'SCHOOL_ADMIN' }, __query: { classroomId: '1' } });

            expect(result).toEqual({ error: 'Classroom not found', code: 404 });
        });
    });

    describe('v1_updateClassroom', () => {
        it('should update a classroom successfully', async () => {
            const mockData = {
                name: 'Updated Classroom',
                capacity: 35,
                students: ['student1', 'student2'],
            };
            const mockClassroom = { _id: '1', ...mockData };

            mockValidators.classroom.v1_updateClassroom.mockResolvedValue(null);
            mockMongoModels.classroom.findByIdAndUpdate.mockResolvedValue(mockClassroom);

            const result = await classroom.v1_updateClassroom({
                __shortToken: { role: 'SCHOOL_ADMIN' },
                __query: { classroomId: '1' },
                ...mockData,
            });

            expect(result).toEqual({
                classroom: {
                    _id: '1',
                    name: 'Updated Classroom',
                    school: mockClassroom.school,
                    capacity: 35,
                    students: ['student1', 'student2'],
                },
            });

            expect(mockValidators.classroom.v1_updateClassroom).toHaveBeenCalledWith({
                ...mockData,
                classroomId: '1',
            });
            expect(mockMongoModels.classroom.findByIdAndUpdate).toHaveBeenCalledWith(
                '1', { name: mockData.name, capacity: mockData.capacity, students: mockData.students },
                { new: true }
            );
        });

        it('should return error if classroom not found during update', async () => {
            const mockData = {
                name: 'Updated Classroom',
                capacity: 35,
                students: ['student1', 'student2'],
            };

            mockValidators.classroom.v1_updateClassroom.mockResolvedValue(null);
            mockMongoModels.classroom.findByIdAndUpdate.mockResolvedValue(null);

            const result = await classroom.v1_updateClassroom({
                __shortToken: { role: 'SCHOOL_ADMIN' },
                __query: { classroomId: '1' },
                ...mockData,
            });

            expect(result).toEqual({ error: 'Classroom not found', code: 404 });
        });
    });

    describe('v1_deleteClassroom', () => {
        it('should delete a classroom successfully', async () => {
            const mockClassroom = {
                _id: '1',
                name: 'Classroom 1',
                school: '123',
                capacity: 30,
                students: ['student1'],
            };

            mockMongoModels.classroom.findByIdAndDelete.mockReturnValue({ select: jest.fn().mockReturnValue(mockClassroom) });

            const result = await classroom.v1_deleteClassroom({ __shortToken: { role: 'SCHOOL_ADMIN' }, __query: { classroomId: '1' } });

            expect(result).toEqual({ deleted: true, classroom: mockClassroom });
            expect(mockMongoModels.classroom.findByIdAndDelete).toHaveBeenCalledWith('1');
        });

        it('should return error if classroom not found during delete', async () => {
            mockMongoModels.classroom.findByIdAndDelete.mockReturnValue({ select: jest.fn().mockReturnValue(null) });

            const result = await classroom.v1_deleteClassroom({ __shortToken: { role: 'SCHOOL_ADMIN' }, __query: { classroomId: '1' } });

            expect(result).toEqual({ error: 'Classroom not found', code: 404 });
        });

    });

});
