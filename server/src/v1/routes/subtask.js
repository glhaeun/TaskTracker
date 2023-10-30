const router = require('express').Router({ mergeParams: true })
const { param, body } = require('express-validator')
const tokenHandler = require('../handlers/tokenHandler')
const validation = require('../handlers/validation')
const subTaskController = require('../controllers/subtask')

router.post(
  '/',
  param('taskId').custom(value => {
    if (!validation.isObjectId(value)) {
      return Promise.reject('invalid task id')
    } else return Promise.resolve()
  }),
  validation.validate,
  tokenHandler.verifyToken,
  subTaskController.create
)

// router.get(
//   '/',
//   param('boardId').custom(value => {
//     if (!validation.isObjectId(value)) {
//       return Promise.reject('invalid board id')
//     } else return Promise.resolve()
//   }),
//   tokenHandler.verifyToken,
//   subTaskController.getAll
// )

router.delete(
  '/:subtaskId',
  param('subtaskId').custom(value => {
    if (!validation.isObjectId(value)) {
      return Promise.reject('invalid task id')
    } else return Promise.resolve()
  }),
  validation.validate,
  tokenHandler.verifyToken,
  subTaskController.delete
)

router.put(
  '/:subtaskId',
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
  subTaskController.update
)

module.exports = router