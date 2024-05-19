const express = require("express")
const userController = require('../controllers/userController')

const router = express.Router()

router.post('/user', userController.signup)
router.post('/user/login', userController.login)

// router.route('/tasks').get(taskController.getAllTask).post(taskController.createNewTask)
// router.route('/tasks/:id').get(taskController.getTaskById).put(taskController.updateTask).delete(taskController.deleteTask)

module.exports = router