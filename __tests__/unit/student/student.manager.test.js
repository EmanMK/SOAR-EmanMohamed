const Student = require('../../../managers/entities/student/student.manager');

describe('Student Manager', () => {
    let mockValidators = {
        student: {
            v1_createStudent: jest.fn(),
            v1_getStudents: jest.fn(),
            v1_updateStudent: jest.fn(),
        },
    };

    let mockMongoModels = {
        student: {
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

    let student = new Student({
        config: {},
        validators: mockValidators,
        mongomodels: mockMongoModels,
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('v1_createStudent', () => {
        it('should create a student successfully', async () => {
            const mockData = {
                firstName: 'John',
                lastName: 'Doe',
                dateOfBirth: '2000-01-01',
                school: '123',
                classrooms: ['class1', 'class2'],
            };
            const mockCreatedStudent = { _id: '1', ...mockData };

            mockValidators.student.v1_createStudent.mockResolvedValue(null);
            mockMongoModels.student.create.mockResolvedValue(mockCreatedStudent);

            const result = await student.v1_createStudent({ __shortToken: { role: 'SCHOOL_ADMIN' }, ...mockData });

            expect(result).toEqual({
                student: {
                    _id: mockCreatedStudent._id,
                    firstName: mockCreatedStudent.firstName,
                    lastName: mockCreatedStudent.lastName,
                    dateOfBirth: mockCreatedStudent.dateOfBirth,
                    school: mockCreatedStudent.school,
                    classrooms: mockCreatedStudent.classrooms,
                },
            });

            expect(mockValidators.student.v1_createStudent).toHaveBeenCalledWith(mockData);
            expect(mockMongoModels.student.create).toHaveBeenCalledWith(mockData);
        });


    });

    describe('v1_getStudents', () => {
        it('should get students successfully', async () => {
            const mockQuery = { limit: 2, page: 1 };
            const mockStudents = [
                { _id: '1', firstName: 'John', lastName: 'Doe', dateOfBirth: '2000-01-01', school: '123', classrooms: ['class1'], profilePicture: 'pic1.jpg' },
                { _id: '2', firstName: 'Jane', lastName: 'Doe', dateOfBirth: '2001-01-01', school: '123', classrooms: ['class2'], profilePicture: 'pic2.jpg' },
            ];
            const totalCount = 5;

            mockValidators.student.v1_getStudents.mockResolvedValue(null);
            mockMongoModels.student.countDocuments.mockResolvedValue(totalCount);
            mockMongoModels.student.find.mockReturnValue({
                skip: jest.fn().mockReturnValue({
                    limit: jest.fn().mockReturnValue({
                        select: jest.fn().mockReturnValue(mockStudents),
                    }),
                }),
            });

            const result = await student.v1_getStudents({ __shortToken: { role: 'SCHOOL_ADMIN' }, __query: mockQuery });

            expect(result).toEqual({
                page: 1,
                totalCount: 5,
                count: 2,
                students: mockStudents,
            });

            expect(mockValidators.student.v1_getStudents).toHaveBeenCalledWith(mockQuery);
            expect(mockMongoModels.student.countDocuments).toHaveBeenCalled();
        });


    });

    describe('v1_updateStudent', () => {
        it('should update a student successfully', async () => {
            const mockData = {
                firstName: 'John',
                lastName: 'Doe',
                dateOfBirth: '2000-01-01',
                school: '123',
                classrooms: ['class1']
            };
            const mockStudent = { _id: '1', ...mockData };

            mockValidators.student.v1_updateStudent.mockResolvedValue(null);
            mockMongoModels.student.findByIdAndUpdate.mockResolvedValue(mockStudent);

            const result = await student.v1_updateStudent({ __shortToken: { role: 'SCHOOL_ADMIN' }, __query: { studentId: '1' }, ...mockData });

            expect(result).toEqual({
                student: {
                    _id: '1',
                    firstName: 'John',
                    lastName: 'Doe',
                    dateOfBirth: '2000-01-01',
                    school: '123',
                    classrooms: ['class1']
                },
            });

            expect(mockValidators.student.v1_updateStudent).toHaveBeenCalledWith({
                ...mockData,
                studentId: '1',
            });
            expect(mockMongoModels.student.findByIdAndUpdate).toHaveBeenCalledWith('1', mockData, { new: true });
        });

        it('should return error if student not found during update', async () => {
            const mockData = {
                firstName: 'John',
                lastName: 'Doe',
                dateOfBirth: '2000-01-01',
                school: '123',
                classrooms: ['class1'],
            };

            mockValidators.student.v1_updateStudent.mockResolvedValue(null);
            mockMongoModels.student.findByIdAndUpdate.mockResolvedValue(null);

            const result = await student.v1_updateStudent({ __shortToken: { role: 'SCHOOL_ADMIN' }, __query: { studentId: '1' }, ...mockData });

            expect(result).toEqual({ error: 'Student not found', code: 404 });
        });
    });

    describe('v1_getStudent', () => {
        it('should get a student by ID successfully', async () => {
            const mockStudent = { _id: '1', firstName: 'John', lastName: 'Doe', dateOfBirth: '2000-01-01', school: '123', classrooms: ['class1'] };

            mockMongoModels.student.findById.mockReturnValue({ select: jest.fn().mockReturnValue(mockStudent) });

            const result = await student.v1_getStudent({ __shortToken: { role: 'SCHOOL_ADMIN' }, __query: { studentId: '1' } });

            expect(result).toEqual({ student: mockStudent });
            expect(mockMongoModels.student.findById).toHaveBeenCalledWith('1');
        });

        it('should return error if student not found during get', async () => {
            mockMongoModels.student.findById.mockReturnValue({ select: jest.fn().mockReturnValue(null) });

            const result = await student.v1_getStudent({ __shortToken: { role: 'SCHOOL_ADMIN' }, __query: { studentId: '1' } });

            expect(result).toEqual({ error: 'Student not found', code: 404 });
        });
    });

    describe('v1_deleteStudent', () => {
        it('should delete a student successfully', async () => {
            const mockStudent = {
                _id: '1',
                firstName: 'John',
                lastName: 'Doe',
                dateOfBirth: '2000-01-01',
                school: '123',
                classrooms: ['class1']
            };

            mockMongoModels.student.findByIdAndDelete.mockReturnValue({ select: jest.fn().mockReturnValue(mockStudent) });

            const result = await student.v1_deleteStudent({ __shortToken: { role: 'SCHOOL_ADMIN' }, __query: { studentId: '1' } });

            expect(result).toEqual({ deleted: true, student: mockStudent });
            expect(mockMongoModels.student.findByIdAndDelete).toHaveBeenCalledWith('1');
        });

        it('should return error if student not found during delete', async () => {
            mockMongoModels.student.findByIdAndDelete.mockReturnValue({ select: jest.fn().mockReturnValue(null) });

            const result = await student.v1_deleteStudent({ __shortToken: { role: 'SCHOOL_ADMIN' }, __query: { studentId: '1' } });

            expect(result).toEqual({ error: 'Student not found', code: 404 });
        });

    });
});
