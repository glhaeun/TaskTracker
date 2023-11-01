const router = require('express').Router()
const journalController = require('../controllers/journal')
const { param, body } = require('express-validator')
const validation = require('../handlers/validation')
const tokenHandler = require('../handlers/tokenHandler')

router.post(
    '/',
    tokenHandler.verifyToken,
    journalController.create
)

router.get(
    '/',
    tokenHandler.verifyToken,
    journalController.getAll
)

router.get(
    '/:journalId',
    param('journalId').custom(value=> {
        if(!validation.isObjectId(value)){
            return Promise.reject('invalid board id')
        } else return Promise.resolve()
       }),
    tokenHandler.verifyToken,
    journalController.getOne
)

  router.delete(
    '/:journalId',
    param('journalId').custom(value=> {
        if(!validation.isObjectId(value)){
            return Promise.reject('invalid board id')
        } else return Promise.resolve()
       }),
    validation.validate,
    tokenHandler.verifyToken,
    journalController.delete
)

router.put(
  '/:journalId',
  param('journalId').custom(value=> {
      if(!validation.isObjectId(value)){
          return Promise.reject('invalid board id')
      } else return Promise.resolve()
     }),
  validation.validate,
  tokenHandler.verifyToken,
  journalController.update
)
module.exports = router