const bcrypt = require("bcryptjs")
const ShortUniqueId = require("short-unique-id")
const jwt = require("jsonwebtoken")
const generateToken = require("../utils/generateToken")
const AppError = require("../utils/appError")

let USERS = []

const protect = async (req, res, next) => {
    let token;
    // console.log(req.cookies)
    token = req.cookies.jwt

    if(token){
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            req.user = USERS.find((user) => user.id === decoded.userId)

            next()
        } catch (error) {
            console.log(error)
            throw new AppError('Not authorized, token failed.', 401)
        }
    } else {
        throw new AppError('Not authorized, No token.', 401)
    }
};

const signup = async (req, res) => {
    try {
        const password = req.body.password
        const salt = await bcrypt.genSalt() // generates salts to creat every password unique
        const hashedPassword = await bcrypt.hash(password, salt) // hash the password
        const uid = new ShortUniqueId({ length: 6 })
        
        const user = { 
            id: uid.rnd(),
            name: req.body.name, 
            password: hashedPassword, 
            email: req.body.email }
            
        generateToken(res, user.id)
        USERS.push(user)
        res.status(201).json({ 
            status: "success",
            user
         })
    } catch (error) {
        console.log(error)
        new AppError('Signup failed, please try again.', 409)
    }
}

const login = async (req, res, next) => {

    const user = USERS.find(user => user.email === req.body.email);
    if(user == null){
        return new AppError("Cannot find user", 404)
    }

    try {
        const password = req.body.password // user input password
        const userHashedPassword = user.password

        const comparePass = await bcrypt.compare(password, userHashedPassword)
        if(comparePass){
            generateToken(res, user.id)
            res.status(200).json({
                status: "succes",
                message: "Successfully Login: basic authentication working!!"})
        } else {
            return new AppError("Not Allowed, please login.", 404)
        }
    } catch (error) {
        console.log(error)
        return new AppError("something wrong in comparing..", 500)
    }
}

const logout = (req, res) => {
    try {
        res.clearCookie('jwt')
        res.status(200).json({
            status: "success",
            message: "Logged out successfully"
        })
    } catch (error) {
        return new AppError("'Logout failed", 500)
    }
}


module.exports = { signup, login, protect, logout }