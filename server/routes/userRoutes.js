import express from 'express'
import { deleteUser, getUser, getAllUser, patchUser, postUser, putUser } from '../controllers/userControllers.js'
import userAuth from '../middleware/authUser.js'
import hasPermission from '../middleware/permissionCheck.js'

const userRouter = express.Router()

userRouter.get('/get-all-user', userAuth, hasPermission('user', 'read'), getAllUser)
userRouter.get('/get-user/:id', userAuth, hasPermission('user', 'read'), getUser)
userRouter.post('/post-user', userAuth, hasPermission('user', 'create'), postUser)
userRouter.put('/put-user/:id', userAuth, hasPermission('user', 'update'), putUser)
userRouter.patch('/patch-user/:id', userAuth, hasPermission('user', 'update'), patchUser)
userRouter.delete('/delete-user/:id', userAuth, hasPermission('user', 'delete'), deleteUser)

export default userRouter