const express = require("express")
require("dotenv").config()
const cookieParser = require("cookie-parser")

const globalErrorHanlder = require("./controllers/errorController")
const AppError = require("./utils/appError")
const taskRoutes = require("./routes/taskRoutes")
const userRoutes = require("./routes/userRoutes")

const app = express()
const PORT = 5000
app.use(express.json())
app.use(cookieParser())

app.use('/taskapi/v1', taskRoutes)
app.use('/taskapi/v1', userRoutes)

// HANDLING UNHANDLED ROUTES
app.all('*', (req, res, next) => {
    next(new AppError(`Cant find ${req.originalUrl} on this server!!`, 404)); // anything pass on next it will automatic directed to the error middleware

});

app.use(globalErrorHanlder)

app.listen(PORT, () => {
    console.log(`Server is started on port: ${PORT}`)
})