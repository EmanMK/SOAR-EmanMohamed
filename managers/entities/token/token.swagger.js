/**
 * @openapi
 * /api/user/v1_createShortToken:
 *   post:
 *     tags:
 *       - token
 *     description: create short token
 *     parameters:
 *       - name: token
 *         in: header
 *         description: long token.
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: short token successfully created.
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
 *                     shortToken:
 *                       type: string
 *                       description: long token of the super admin used to create short token<access token>.
 * 
 * 
 */
