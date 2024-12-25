/**
 * @openapi
 * /api/user/createSuperAdmin:
 *   post:
 *     tags:
 *       - user
 *     description: create super admin
 *     requestBody:
 *       description: super admin details.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: username of the super admin.
 *               email:
 *                 type: string
 *                 description: email of the super admin.
 *               password:
 *                 type: string
 *                 description: password number of the super admin.
 *             required:
 *               - username
 *     responses:
 *       200:
 *         description: super admin successfully created.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   properties:
 *                     longToken:
 *                       type: string
 *                       description: long token of the super admin used to create short token<access token>.
 * 
 *      
 * /api/user/createSchoolAdmin:
 *   post:
 *     tags:
 *       - user
 *     description: create school admin
 *     requestBody:
 *       description: The shool admin details.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: username of the super admin.
 *               email:
 *                 type: string
 *                 description: email of the super admin.
 *               password:
 *                 type: string
 *                 description: password number of the super admin.
 *             required:
 *               - username
 *     responses:
 *       200:
 *         description: super admin successfully created.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                  type: boolean
 *                 data:
 *                   type: object
 *                   properties:
 *                     longToken:
 *                       type: string
 *                       description: long token of the super admin used to create short token<access token>.
 * 
 */
