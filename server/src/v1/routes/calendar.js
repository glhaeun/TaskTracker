const router = require('express').Router()
const calendarController = require('../controllers/calendar')
const { param, body } = require('express-validator')
const validation = require('../handlers/validation')
const tokenHandler = require('../handlers/tokenHandler')

router.post(
    '/',
    tokenHandler.verifyToken,
    calendarController.create
)

router.get(
    '/',
    tokenHandler.verifyToken,
    calendarController.getAll
)

router.get(
    '/:calendarDate',
    tokenHandler.verifyToken,
    calendarController.getOne
)

  router.delete(
    '/:eventId',
    param('eventId').custom(value=> {
        if(!validation.isObjectId(value)){
            return Promise.reject('invalid board id')
        } else return Promise.resolve()
       }),
    validation.validate,
    tokenHandler.verifyToken,
    calendarController.delete
)

router.put(
  '/:eventId',
  param('eventId').custom(value=> {
      if(!validation.isObjectId(value)){
          return Promise.reject('invalid board id')
      } else return Promise.resolve()
     }),
  validation.validate,
  tokenHandler.verifyToken,
  calendarController.update
)
module.exports = router