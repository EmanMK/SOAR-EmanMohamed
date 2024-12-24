/**
 * @openapi
 * /api/school/v1_createSchool:
 *   post:
 *     tags:
 *       - School
 *     description: Creates a new school with the provided details.
 *     parameters:
 *       - name: token
 *         in: header
 *         description: short token.
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       description: The school details.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the school.
 *               address:
 *                 type: string
 *                 description: Address of the school.
 *               phone:
 *                 type: string
 *                 description: Phone number of the school.
 *               email:
 *                 type: string
 *                 description: Email of the school.
 *             required:
 *               - name
 *               - address
 *               - phone
 *               - email
 *     responses:
 *       200:
 *         description: School successfully created.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     school:
 *                       type: object
 *                       properties:
 *                         _id:
 *                           type: string
 *                         name:
 *                           type: string
 *                         email:
 *                           type: string
 *                         address:
 *                           type: string
 *                         phone:
 *                           type: string
 *       400:
 *         description: Bad request or validation failed.
 *
 * /api/school/v1_getSchools:
 *   get:
 *     tags:
 *       - School
 *     description: Retrieves a list of schools with pagination.
 *     parameters:
 *       - name: token
 *         in: header
 *         description: short token.
 *         required: true
 *         schema:
 *           type: string
 *       - name: limit
 *         in: query
 *         description: Number of schools to retrieve per page.
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
 *         description: A list of schools.
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
 *                 schools:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       name:
 *                         type: string
 *                       email:
 *                         type: string
 *                       address:
 *                         type: string
 *                       phone:
 *                         type: string
 *       400:
 *         description: Bad request or validation failed.
 *
 * /api/school/v1_getSchool:
 *   get:
 *     tags:
 *       - School
 *     description: Retrieves a single school by its ID.
 *     parameters:
 *       - name: token
 *         in: header
 *         description: short token.
 *         required: true
 *         schema:
 *           type: string
 *       - name: schoolId
 *         in: query
 *         description: The ID of the school to retrieve.
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The school details.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 school:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     name:
 *                       type: string
 *                     email:
 *                       type: string
 *                     address:
 *                       type: string
 *                     phone:
 *                       type: string
 *       404:
 *         description: School not found.
 *
 * /api/school/v1_updateSchool:
 *   put:
 *     tags:
 *       - School
 *     description: Updates a school by its ID with the provided details.
 *     parameters:
 *       - name: token
 *         in: header
 *         description: short token.
 *         required: true
 *         schema:
 *           type: string
 *       - name: schoolId
 *         in: query
 *         description: The ID of the school to update.
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       description: The school details to update.
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               address:
 *                 type: string
 *               phone:
 *                 type: string
 *             additionalProperties: false  # Ensures no extra fields are added to the request body.
 *     responses:
 *       200:
 *         description: School successfully updated.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A success message.
 *                 school:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     name:
 *                       type: string
 *                     email:
 *                       type: string
 *                     address:
 *                       type: string
 *                     phone:
 *                       type: string
 *       400:
 *         description: Bad request or validation failed.
 *       404:
 *         description: School not found.
 *
 * /api/school/v1_deleteSchool:
 *   delete:
 *     tags:
 *       - School
 *     description: Deletes a school by its ID.
 *     parameters:
 *       - name: token
 *         in: header
 *         description: short token for authentication.
 *         required: true
 *         schema:
 *           type: string
 *       - name: schoolId
 *         in: query
 *         description: The ID of the school to delete.
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: School successfully deleted.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 deleted:
 *                   type: boolean
 *                 school:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     name:
 *                       type: string
 *                     email:
 *                       type: string
 *                     address:
 *                       type: string
 *                     phone:
 *                       type: string
 *       404:
 *         description: School not found.
 */
