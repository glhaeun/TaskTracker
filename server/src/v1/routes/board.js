const router = require('express').Router({mergeParams: true})
const { param, body } = require('express-validator')
const validation = require('../handlers/validation')
const tokenHandler = require('../handlers/tokenHandler')
const boardController = require('../controllers/board')

router.post(
   '/',
   validation.validate,
   tokenHandler.verifyToken,
   boardController.create
)

router.put(
    '/:boardId',
    param('boardId').custom(value=> {
        if(!validation.isObjectId(value)){
            return Promise.reject('invalid board id')
        } else return Promise.resolve()
       }),
    validation.validate,
    tokenHandler.verifyToken,
    boardController.update
)

router.delete(
    '/:boardId',
    param('boardId').custom(value=> {
        if(!validation.isObjectId(value)){
            return Promise.reject('invalid board id')
        } else return Promise.resolve()
       }),
    validation.validate,
    tokenHandler.verifyToken,
    boardController.delete
)

router.get(
    '/',
    validation.validate,
    tokenHandler.verifyToken,
    boardController.getAll
)


module.exports = router