const { Router } = require('express')
const Status = require('http-status')
const container = require('src/container') // we have to get the DI

const {
  getOneUseCase,
  createUseCase,
  getAllUseCase,
  removeUseCase,
  updateUseCase
} = require('src/app/style')

module.exports = () => {
  const router = Router()
  const { logger, auth, response: { Success, Fail } } = container.cradle

  /**
   * @swagger
   * definitions:
   *   style:
   *     properties:
   *       id:
   *         type: string
   *         format: uuid
   *         description: Style's id in Uuidv4 format
   *       name:
   *         type: string
   *         description: Style's name
   *       description:
   *         type: string
   *         description: Style's description
   *       brand:
   *         type: string
   *         format: uiid
   *         description: The brand it belongs to in Uuidv4 format
   *       parent:
   *         type: string
   *         format: uiid
   *         description: The parent style in Uuidv4 format
   *       category:
   *         type: string
   *         format: uiid
   *         description: The category it belongs to in Uuidv4 format
   *       updatedAt:
   *          type: string
   *          format: date-time
   *          description: The time it was last updated
   */

  router.use(auth.authenticate())

  /**
   * @swagger
   * /styles/id:
   *   get:
   *     tags:
   *       - Styles
   *     description: Returns one style given id
   *     security:
   *       - JWT: []
   *     responses:
   *       200:
   *         description: A style in json format
   *         schema:
   *           $ref: '#/definitions/style'
   *       401:
   *        $ref: '#/responses/Unauthorized'

   */
  router
    .get('/:id', (req, res, next) => {
      getOneUseCase
        .getOne(req.params.id)
        .then(data => {
          res.status(Status.OK).json(Success(data))
        })
        .catch((error) => {
          logger.error(error) // we still need to log every error for debugging
          next(error)
        })
    })
  /**
   * @swagger
   * /styles/:
   *   get:
   *     tags:
   *       - Styles
   *     description: Returns a list of styles
   *     security:
   *       - JWT: []
   *     responses:
   *       200:
   *         description: An array of styles
   *         schema:
   *           type: array
   *           items:
   *             $ref: '#/definitions/style'
   *       401:
   *        $ref: '#/responses/Unauthorized'

   */
  router
    .get('/', (req, res) => {
      getAllUseCase
        .all(req, res)
        .then(data => {
          res.status(Status.OK).json(Success(data))
        })
        .catch((error) => {
          logger.error(error) // we still need to log every error for debugging
          res.status(Status.BAD_REQUEST).json(
            Fail(error.message))
        })
    })

  /**
 * @swagger
 * /styles/:
 *   post:
 *     tags:
 *       - Styles
 *     description: Create new style
 *     security:
 *       - JWT: []
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         description: Style's Entity
 *         in: body
 *         required: true
 *         type: string
 *         schema:
 *           $ref: '#/definitions/style'
 *     responses:
 *       200:
 *         description: Successfully Created
 *         schema:
 *           $ref: '#/definitions/style'
 *       401:
 *         $ref: '#/responses/Unauthorized'
 *       400:
 *         $ref: '#/responses/BadRequest'
 */
  router
    .post('/', (req, res) => {
      createUseCase
        .create({ body: req.body })
        .then(data => {
          res.status(Status.OK).json(Success(data))
        })
        .catch((error) => {
          logger.error(error) // we still need to log every error for debugging
          res.status(Status.BAD_REQUEST).json(
            Fail(error.message))
        })
    })
  /**
   * @swagger
   * /styles/id:
   *   put:
   *     tags:
   *       - Styles
   *     description: Update Style
   *     security:
   *       - JWT: []
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: id
   *         in: path
   *         required: true
   *         description: Style's ID to update
   *         type: string
   *       - name: body
   *         description: Style's Entity
   *         in: body
   *         required: true
   *         type: string
   *         schema:
   *           $ref: '#/definitions/style'
   *     responses:
   *       200:
   *         description: Successfully Updated
   *         schema:
   *           $ref: '#/definitions/style'
   *       401:
   *         $ref: '#/responses/Unauthorized'
   *       400:
   *         $ref: '#/responses/BadRequest'
   */
  router
    .put('/:id', (req, res) => {
      updateUseCase
        .update({ id: req.params.id, body: req.body })
        .then(data => {
          res.status(Status.OK).json(Success(data))
        })
        .catch((error) => {
          logger.error(error) // we still need to log every error for debugging
          res.status(Status.BAD_REQUEST).json(
            Fail(error.message))
        })
    })
  /**
   * @swagger
   * /styles/id:
   *   delete:
   *     tags:
   *       - Styles
   *     description: Delete Style
   *     security:
   *       - JWT: []
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: id
   *         in: path
   *         required: true
   *         description: Style's ID to delete
   *         type: string
   *     responses:
   *       200:
   *         description: Successfully Deleted
   *         schema:
   *           $ref: '#/definitions/style'
   *       401:
   *         $ref: '#/responses/Unauthorized'
   */
  router
    .delete('/:id', (req, res) => {
      removeUseCase
        .remove({ id: req.params.id })
        .then(data => {
          res.status(Status.OK).json(Success(data))
        })
        .catch((error) => {
          logger.error(error) // we still need to log every error for debugging
          res.status(Status.BAD_REQUEST).json(
            Fail(error.message))
        })
    })

  return router
}
