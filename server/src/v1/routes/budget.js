const router = require('express').Router()
const budgetController = require('../controllers/budget')
const { param, body } = require('express-validator')
const validation = require('../handlers/validation')
const tokenHandler = require('../handlers/tokenHandler')

router.post(
    '/',
    tokenHandler.verifyToken,
    budgetController.create
)

router.get(
    '/',
    tokenHandler.verifyToken,
    budgetController.getAll
)

router.get(
    '/expenses',
    tokenHandler.verifyToken,
    budgetController.getAllExpenses
)

router.get(
    '/:budgetId',
    param('budgetId').custom(value=> {
        if(!validation.isObjectId(value)){
            return Promise.reject('invalid board id')
        } else return Promise.resolve()
       }),
    tokenHandler.verifyToken,
    budgetController.getOne
)

  router.delete(
    '/:budgetId',
    param('budgetId').custom(value=> {
        if(!validation.isObjectId(value)){
            return Promise.reject('invalid board id')
        } else return Promise.resolve()
       }),
    validation.validate,
    tokenHandler.verifyToken,
    budgetController.delete
)

router.put(
  '/:budgetId',
  param('budgetId').custom(value=> {
      if(!validation.isObjectId(value)){
          return Promise.reject('invalid board id')
      } else return Promise.resolve()
     }),
  validation.validate,
  tokenHandler.verifyToken,
  budgetController.addExpenses
)

module.exports = router