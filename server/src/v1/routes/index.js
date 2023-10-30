var router = require('express').Router()

router.use('/auth', require('./auth'))
router.use('/todo', require('./board'))
router.use('/todo/:boardId/task', require('./task'))
router.use('/todo/:taskId/subtask/', require('./subtask'))







module.exports = router;
