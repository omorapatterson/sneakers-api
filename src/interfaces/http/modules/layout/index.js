const { Router } = require('express')
const Status = require('http-status')
const container = require('src/container') // we have to get the DI

const {
  getLayoutHeadingUseCase,
  setLayoutHeadingUseCase,
  getLayoutSliderUseCase,
  setLayoutSliderUseCase,
  getLayoutUseCase,
  setLayoutUseCase
} = require('src/app/layout')

module.exports = () => {
  const router = Router()
  const { logger, auth, response: { Success, Fail } } = container.cradle

  /**
 * @swagger
 * definitions:
 *   layout:
 *     properties:
 *       page:
 *         type: string
 *       heading:
 *         type: string
 *       header:
 *         type: string
 *       slider:
 *         type: string
 *       hottest:
 *         type: string
 */
  router
    .get('/', (req, res, next) => {
      getLayoutUseCase
        .getPageLayout(req.query.page)
        .then(data => {
          res.status(Status.OK).json(Success(data))
        })
        .catch((error) => {
          logger.error(error) // we still need to log every error for debugging
          next(error)
        })
    })

  router.use(auth.authenticate())

  router
    .put('/', (req, res) => {
      setLayoutUseCase
        .setLayout(req.query.page, req.body)
        .then(data => {
          res.status(Status.OK).json(Success(data))
        })
        .catch((error) => {
          logger.error(error) // we still need to log every error for debugging
          res.status(Status.BAD_REQUEST).json(
            Fail(error.message))
        })
    })

  router
    .put('/:page/slider', (req, res) => {
      setLayoutSliderUseCase
        .setLayout(req.params.page, req.body)
        .then(data => {
          res.status(Status.OK).json(Success(data))
        })
        .catch((error) => {
          logger.error(error) // we still need to log every error for debugging
          res.status(Status.BAD_REQUEST).json(
            Fail(error.message))
        })
    })
  router
    .get('/:page/slider', (req, res) => {
      getLayoutSliderUseCase
        .getLayoutSlider(req.query)
        .then(data => {
          res.status(Status.OK).json(Success(data))
        })
        .catch((error) => {
          logger.error(error) // we still need to log every error for debugging
          res.status(Status.BAD_REQUEST).json(
            Fail(error.message))
        })
    })
  router
    .put('/:page/heading', (req, res) => {
      console.log(JSON.stringify(req.params))
      setLayoutHeadingUseCase
        .setLayoutHeading(req.params.page, req.body)
        .then(data => {
          res.status(Status.OK).json(Success(data))
        })
        .catch((error) => {
          logger.error(error) // we still need to log every error for debugging
          res.status(Status.BAD_REQUEST).json(
            Fail(error.message))
        })
    })

  router
    .get('/:page/heading', (req, res) => {
      getLayoutHeadingUseCase
        .getLayoutHeading(req.params.page)
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
