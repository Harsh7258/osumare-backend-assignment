const ShortUniqueId = require("short-unique-id")
const AppError = require("../utils/appError")

let NEW_TASK = []

const validatePaginationParams = (req) =>  {
    const { page = 1, limit = 3 } = req.query;
  
    // Basic validation (can be extended based on your requirements)
    if (isNaN(page) || isNaN(limit) || page < 1 || limit < 1) {
      throw new AppError('Invalid pagination parameters: page and limit must be positive integers.', 400);
    }
  
    return { page, limit };
}

const getAllTask = (req, res) => {
    if (NEW_TASK.length === 0) {
        throw new AppError('No tasks found. Please create a task first.', 404);
      }
  
      const { page, limit } = validatePaginationParams(req);
  
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
  
      const paginatedTasks = NEW_TASK.slice(startIndex, endIndex);
  
      const totalPages = Math.ceil(NEW_TASK.length / limit); // 
      const hasNextPage = page < totalPages;
      const hasPreviousPage = page > 1;
  
      const response = {
        tasks: paginatedTasks,
        pagination: {
          page,
          limit,
          totalPages,
          hasNextPage,
          hasPreviousPage,
        },
      };
    //   console.log(response)
  
      res.status(200).json(response);
}

const getTaskById = (req, res) => {
    const taskId = req.params.id

    if(!taskId) {
        new AppError("No task found on this ID.", 404)
    } 

    try {
        const findTaskById = NEW_TASK.find((task) => task.id === taskId)
        res.status(200).json({
            status: "success",
            task: findTaskById
        })
    } catch (error) {
        new AppError(`Internal server error: ${error.message}`, 500)
    }
}

const createNewTask = (req, res) => {
    try {
        const uid = new ShortUniqueId({ length: 6 })
    
        const newTask = {
            id: uid.rnd(),
            task: req.body.task,
            description: req.body.description,
            createdAt: new Date().toISOString()
        }
        NEW_TASK.push(newTask)
        res.status(201).json({
            status: "success",
            task: newTask,
            message: 'Created new task'
        })
    } catch (error) {
        new AppError(`Internal server error: ${error.message}`, 500)
    }
}

const updateTask = (req, res) => {
    const taskId = req.params.id
    if(!taskId) {
        new AppError("No task found on this ID.", 404)
    } 
    
    try {
        const findTaskById = NEW_TASK.findIndex((task) => task.id === taskId)
        
        const updatedTask = {
            ...NEW_TASK[findTaskById],
            task: req.body.task,
            description: req.body.description,
            createdAt: new Date().toISOString(),
          };
        
          NEW_TASK[findTaskById] = updatedTask;
        res.status(201).json({
            status: "success",
            task: updatedTask,
            message: 'Created new task'
        })
    } catch (error) {
        new AppError(`Internal server error: ${error.message}`, 500)
    }
}

const deleteTask = async (req, res) => {
    const taskId = req.params.id
    if(!taskId){
        return new AppError("Invalid task ID: must be a string.", 404)
    }

    try {
        const updatedTasks = NEW_TASK.filter(task => task.id !== taskId);
        NEW_TASK.length = 0; // Clear existing array elements
        NEW_TASK.push(...updatedTasks);
    
        res.status(200).json({
            status: "succes",
            message: `Task with ID ${taskId} deleted successfully` });
      } catch (error) {
        new AppError(`Internal server error: ${error.message}`, 500)
      }
    
}

module.exports = { getAllTask, getTaskById, updateTask, deleteTask, createNewTask }