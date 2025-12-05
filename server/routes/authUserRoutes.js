import express from 'express'
import { getUserData, isAuth, login, logout, register } from '../controllers/authUserControllers.js'
import userAuth from '../middleware/authUser.js'

const authUserRouter = express.Router()

authUserRouter.post('/register', register)
authUserRouter.post('/login', login)
authUserRouter.post('/logout', logout)
authUserRouter.get('/is-auth', userAuth, isAuth)
authUserRouter.get('/get-user-data', userAuth, getUserData)

export default authUserRouter