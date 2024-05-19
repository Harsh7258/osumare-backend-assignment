const express = require("express")
const userController = require('../controllers/userController')

const router = express.Router()

router.post('/user', userController.signup)
router.post('/user/login', userController.login)
router.post('/user/logout', userController.logout)

module.exports = router