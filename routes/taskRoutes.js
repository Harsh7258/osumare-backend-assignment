const express = require("express")
const taskController = require('../controllers/taskController')

const router = express.Router()

router.route('/tasks').get(taskController.getAllTask).post(taskController.createNewTask)
router.route('/tasks/:id').get(taskController.getTaskById).put(taskController.updateTask).delete(taskController.deleteTask)

module.exports = router