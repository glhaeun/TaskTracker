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
    param('boardId').custom(value => {
      if (!validation.isObjectId(value)) {
        return Promise.reject('invalid board id')
      } else return Promise.resolve()
    }),
    body('sectionId').custom(value => {
      if (!validation.isObjectId(value)) {
        return Promise.reject('invalid section id')
      } else return Promise.resolve()
    }),
    tokenHandler.verifyToken,
    journalController.getAll
  )
  
