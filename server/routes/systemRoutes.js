import express from 'express'
import { deleteSystem, getSystem, getAllSystem, patchSystem, postSystem, putSystem } from '../controllers/systemControllers.js'
import userAuth from '../middleware/authUser.js'
import hasPermission from '../middleware/permissionCheck.js'

const systemRouter = express.Router()

systemRouter.get('/get-all-system', userAuth, hasPermission('system', 'read'), getAllSystem)
systemRouter.get('/get-system/:id', userAuth, hasPermission('system', 'read'), getSystem)
systemRouter.post('/post-system', userAuth, hasPermission('system', 'create'), postSystem)
systemRouter.put('/put-system/:id', userAuth, hasPermission('system', 'update'), putSystem)
systemRouter.patch('/patch-system/:id', userAuth, hasPermission('system', 'update'), patchSystem)
systemRouter.delete('/delete-system/:id', userAuth, hasPermission('system', 'delete'), deleteSystem)

export default systemRouter