var router = require('express').Router()

router.use('/auth', require('./auth'))
router.use('/todo', require('./board'))
router.use('/todo/:boardId/task', require('./task'))
router.use('/task', require('./task'))
router.use('/journal', require('./journal'))
router.use('/notes', require('./notes'))
router.use('/budget', require('./budget'))
router.use('/budget/:budgetId/expenses', require('./budget'))
router.use('/calendar', require('./calendar'))




module.exports = router;
