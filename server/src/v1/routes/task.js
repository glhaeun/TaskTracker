const router = require('express').Router({ mergeParams: true })
const { param } = require('express-validator')
const tokenHandler = require('../handlers/tokenHandler')
const validation = require('../handlers/validation')
const taskController = require('../controllers/task')

router.post(
  '/',
  param('boardId').custom(value => {
    if (!validation.isObjectId(value)) {
      return Promise.reject('invalid board id')
    } else return Promise.resolve()
  }),
  validation.validate,
  tokenHandler.verifyToken,
  taskController.create
)

router.put(
  '/update-position',
  validation.validate,
  tokenHandler.verifyToken,
  taskController.updatePosition
)

router.put(
  '/update-section',
  param('boardId').custom(value => {
    if (!validation.isObjectId(value)) {
      return Promise.reject('invalid board id')
    } else return Promise.resolve()
  }),
  validation.validate,
  tokenHandler.verifyToken,
  taskController.updateSection
)

router.get(
  '/',
  param('boardId').custom(value => {
    if (!validation.isObjectId(value)) {
      return Promise.reject('invalid board id')
    } else return Promise.resolve()
  }),
  tokenHandler.verifyToken,
  taskController.getAll
)

router.get(
  '/upcoming',
  param('boardId').custom(value => {
    if (!validation.isObjectId(value)) {
      return Promise.reject('invalid board id')
    } else return Promise.resolve()
  }),
  tokenHandler.verifyToken,
  taskController.getUpcoming
)

router.get(
  '/:calendarDate',
  tokenHandler.verifyToken,
  taskController.getForCalendar
)

router.delete(
  '/:taskId',
  param('boardId').custom(value => {
    if (!validation.isObjectId(value)) {
      return Promise.reject('invalid board id')
    } else return Promise.resolve()
  }),
  param('taskId').custom(value => {
    if (!validation.isObjectId(value)) {
      return Promise.reject('invalid task id')
    } else return Promise.resolve()
  }),
  validation.validate,
  tokenHandler.verifyToken,
  taskController.delete
)

router.put(
  '/:taskId',
  param('boardId').custom(value => {
    if (!validation.isObjectId(value)) {
      return Promise.reject('invalid board id')
    } else return Promise.resolve()
  }),
  param('taskId').custom(value => {
    if (!validation.isObjectId(value)) {
      return Promise.reject('invalid task id')
    } else return Promise.resolve()
  }),
  validation.validate,
  tokenHandler.verifyToken,
  taskController.update
)

module.exports = router