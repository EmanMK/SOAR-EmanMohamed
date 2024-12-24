/**
 * @openapi
 * /api/classroom/v1_getClassroom:
 *   get:
 *     tags:
 *       - Classroom
 *     description: Retrieves a classroom by its ID.
 *     parameters:
 *       - name: token
 *         in: header
 *         description: short token.
 *         required: true
 *         schema:
 *           type: string
 *       - name: classroomId
 *         in: query
 *         description: The ID of the classroom to retrieve.
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The classroom details.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 school:
 *                   type: string
 *                 name:
 *                   type: string
 *                 capacity:
 *                   type: integer
 *                 students:
 *                   type: array
 *                   items:
 *                     type: string
 *       404:
 *         description: Classroom not found.
 *
 * /api/classroom/v1_getClassrooms:
 *   get:
 *     tags:
 *       - Classroom
 *     description: Retrieves a list of classrooms.
 *     parameters:
 *       - name: token
 *         in: header
 *         description: short token.
 *         required: true
 *         schema:
 *           type: string
 *       - name: limit
 *         in: query
 *         description: Number of classrooms to retrieve per page.
 *         required: false
 *         schema:
 *           type: integer
 *           default: 15
 *       - name: page
 *         in: query
 *         description: Page number for pagination.
 *         required: false
 *         schema:
 *           type: integer
 *           default: 1
 *     responses:
 *       200:
 *         description: A list of classrooms.
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
 *                 classrooms:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       school:
 *                         type: string
 *                       name:
 *                         type: string
 *                       capacity:
 *                         type: integer
 *                       students:
 *                         type: array
 *                         items:
 *                           type: string
 *       404:
 *         description: No classrooms found.
 *
 * /api/classroom/v1_deleteClassroom:
 *   delete:
 *     tags:
 *       - Classroom
 *     description: Deletes a classroom by its ID.
 *     parameters:
 *       - name: token
 *         in: header
 *         description: short token.
 *         required: true
 *         schema:
 *           type: string
 *       - name: classroomId
 *         in: query
 *         description: The ID of the classroom to delete.
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The classroom has been deleted successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 deleted:
 *                   type: boolean
 *                 _id:
 *                   type: string
 *                 school:
 *                   type: string
 *                 name:
 *                   type: string
 *                 capacity:
 *                   type: integer
 *                 students:
 *                   type: array
 *                   items:
 *                     type: string
 *       404:
 *         description: Classroom not found.
 *
 * /api/classroom/v1_createClassroom:
 *   post:
 *     tags:
 *       - Classroom
 *     description: Creates a new classroom.
 *     requestBody:
 *       description: The classroom details to create.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               schoolId:
 *                 type: string
 *               name:
 *                 type: string
 *               capacity:
 *                 type: integer
 *               students:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: The classroom has been created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 school:
 *                   type: string
 *                 capacity:
 *                   type: integer
 *                 students:
 *                   type: array
 *                   items:
 *                     type: string
 *       400:
 *         description: Invalid input data.
 */
