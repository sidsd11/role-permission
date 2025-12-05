import express from 'express'
import { deleteProperty, getProperty, getAllProperty, patchProperty, postProperty, putProperty } from '../controllers/propertyControllers.js'
import userAuth from '../middleware/authUser.js'
import hasPermission from '../middleware/permissionCheck.js'

const propertyRouter = express.Router()

propertyRouter.get('/get-all-property', userAuth, hasPermission('property', 'read'), getAllProperty)
propertyRouter.get('/get-property/:id', userAuth, hasPermission('property', 'read'), getProperty)
propertyRouter.post('/post-property', userAuth, hasPermission('property', 'create'), postProperty)
propertyRouter.put('/put-property/:id', userAuth, hasPermission('property', 'update'), putProperty)
propertyRouter.patch('/patch-property/:id', userAuth, hasPermission('property', 'update'), patchProperty)
propertyRouter.delete('/delete-property/:id', userAuth, hasPermission('property', 'delete'), deleteProperty)

export default propertyRouter