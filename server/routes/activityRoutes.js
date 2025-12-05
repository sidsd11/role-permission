import express from 'express'
import { deleteActivity, getActivity, getAllActivity, patchActivity, postActivity, putActivity } from '../controllers/activityControllers.js'
import userAuth from '../middleware/authUser.js'
import hasPermission from '../middleware/permissionCheck.js'

const activityRouter = express.Router()

activityRouter.get('/get-all-activity', userAuth, hasPermission('activity', 'read'), getAllActivity)
activityRouter.get('/get-activity/:id', userAuth, hasPermission('activity', 'read'), getActivity)
activityRouter.post('/post-activity', userAuth, hasPermission('activity', 'create'), postActivity)
activityRouter.put('/put-activity/:id', userAuth, hasPermission('activity', 'update'), putActivity)
activityRouter.patch('/patch-activity/:id', userAuth, hasPermission('activity', 'update'), patchActivity)
activityRouter.delete('/delete-activity/:id', userAuth, hasPermission('activity', 'delete'), deleteActivity)

export default activityRouter