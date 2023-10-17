var router = require('express').Router()

router.use('/auth', require('./auth'))
router.use('/journal', require('./journal'))





module.exports = router;
