var router = require('express').Router()

router.use('/auth', require('./auth'))
router.use('/todo', require('./board'))
router.use('/todo/:boardId/task', require('./task'))
router.use('/journal', require('./journal'))

module.exports = router;
