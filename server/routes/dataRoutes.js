import express from 'express'
import { deleteData, getData, getAllData, patchData, postData, putData } from '../controllers/dataControllers.js'
import userAuth from '../middleware/authUser.js'
import hasPermission from '../middleware/permissionCheck.js'

const dataRouter = express.Router()

dataRouter.get('/get-all-data', userAuth, hasPermission('data', 'read'), getAllData)
dataRouter.get('/get-data/:id', userAuth, hasPermission('data', 'read'), getData)
dataRouter.post('/post-data', userAuth, hasPermission('data', 'create'), postData)
dataRouter.put('/put-data/:id', userAuth, hasPermission('data', 'update'), putData)
dataRouter.patch('/patch-data/:id', userAuth, hasPermission('data', 'update'), patchData)
dataRouter.delete('/delete-data/:id', userAuth, hasPermission('data', 'delete'), deleteData)

export default dataRouter