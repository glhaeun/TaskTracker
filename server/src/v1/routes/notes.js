const router = require('express').Router()
const notesController = require('../controllers/notes')
const { param, body } = require('express-validator')
const validation = require('../handlers/validation')
const tokenHandler = require('../handlers/tokenHandler')

router.post(
    '/',
    tokenHandler.verifyToken,
    notesController.create
)

router.get(
    '/',
    tokenHandler.verifyToken,
    notesController.getAll
)

router.get(
    '/archive',
    tokenHandler.verifyToken,
    notesController.getArchive
);

router.get(
    '/deleted',
    tokenHandler.verifyToken,
    notesController.getDeleted
);


router.put(
    '/:noteId',
    tokenHandler.verifyToken,
    notesController.updateStatus
)


// router.get(
//     '/:journalId',
//     param('journalId').custom(value=> {
//         if(!validation.isObjectId(value)){
//             return Promise.reject('invalid board id')
//         } else return Promise.resolve()
//        }),
//     tokenHandler.verifyToken,
//     journalController.getOne
// )

//   router.delete(
//     '/:journalId',
//     param('journalId').custom(value=> {
//         if(!validation.isObjectId(value)){
//             return Promise.reject('invalid board id')
//         } else return Promise.resolve()
//        }),
//     validation.validate,
//     tokenHandler.verifyToken,
//     journalController.delete
// )

// router.put(
//   '/:journalId',
//   param('journalId').custom(value=> {
//       if(!validation.isObjectId(value)){
//           return Promise.reject('invalid board id')
//       } else return Promise.resolve()
//      }),
//   validation.validate,
//   tokenHandler.verifyToken,
//   journalController.update
// )
module.exports = router