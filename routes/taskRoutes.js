const express = require("express")
const taskController = require('../controllers/taskController')
const { protect } = require('../controllers/userController')

const router = express.Router()

router.route('/tasks').get(taskController.getAllTask).post(protect, taskController.createNewTask)
router.route('/tasks/:id').get(taskController.getTaskById).put( protect, taskController.updateTask).delete(protect, taskController.deleteTask)

module.exports = router