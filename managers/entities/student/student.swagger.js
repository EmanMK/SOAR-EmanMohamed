/**
 * @openapi
 * /api/student/v1_getStudent:
 *   get:
 *     tags:
 *       - Student
 *     description: Retrieves a student by their ID.
 *     parameters:
 *       - name: token
 *         in: header
 *         description: Authentication token.
 *         required: true
 *         schema:
 *           type: string
 *       - name: studentId
 *         in: query
 *         description: The ID of the student to retrieve.
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The student details.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 firstName:
 *                   type: string
 *                 lastName:
 *                   type: string
 *                 dateOfBirth:
 *                   type: string
 *                   format: date-time
 *                 school:
 *                   type: string
 *       404:
 *         description: Student not found.
 *
 * /api/student/v1_getStudents:
 *   get:
 *     tags:
 *       - Student
 *     description: Retrieves a list of students.
 *     parameters:
 *       - name: token
 *         in: header
 *         description: Authentication token.
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of students.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 page:
 *                   type: integer
 *                 totalCount:
 *                   type: integer
 *                 count:
 *                   type: integer
 *                 students:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       firstName:
 *                         type: string
 *                       lastName:
 *                         type: string
 *                       dateOfBirth:
 *                         type: string
 *                         format: date-time
 *                       school:
 *                         type: string
 *       404:
 *         description: No students found.
 *
 * /api/student/v1_deleteStudent:
 *   delete:
 *     tags:
 *       - Student
 *     description: Deletes a student by their ID.
 *     parameters:
 *       - name: token
 *         in: header
 *         description: Authentication token.
 *         required: true
 *         schema:
 *           type: string
 *       - name: studentId
 *         in: query
 *         description: The ID of the student to delete.
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The student has been deleted successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 deleted:
 *                   type: boolean
 *                 _id:
 *                   type: string
 *                 firstName:
 *                   type: string
 *                 lastName:
 *                   type: string
 *                 dateOfBirth:
 *                   type: string
 *                   format: date-time
 *                 school:
 *                   type: string
 *       404:
 *         description: Student not found.
 *
 * /api/student/v1_createStudent:
 *   post:
 *     tags:
 *       - Student
 *     description: Creates a new student.
 *     parameters:
 *       - name: token
 *         in: header
 *         description: Authentication token.
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       description: The student data to create.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               dateOfBirth:
 *                 type: string
 *                 format: date
 *               school:
 *                 type: string
 *               classrooms:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: The student has been successfully created.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 firstName:
 *                   type: string
 *                 lastName:
 *                   type: string
 *                 dateOfBirth:
 *                   type: string
 *                   format: date-time
 *                 school:
 *                   type: string
 *                 classrooms:
 *                   type: array
 *                   items:
 *                     type: string
 *       400:
 *         description: Invalid request data.
 */
