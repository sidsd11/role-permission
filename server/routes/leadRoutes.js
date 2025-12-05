import express from 'express'
import { deleteLead, getLead, getAllLead, patchLead, postLead, putLead } from '../controllers/leadControllers.js'
import userAuth from '../middleware/authUser.js'
import hasPermission from '../middleware/permissionCheck.js'

const leadRouter = express.Router()

leadRouter.get('/get-all-lead', userAuth, hasPermission('lead', 'read'), getAllLead)
leadRouter.get('/get-lead/:id', userAuth, hasPermission('lead', 'read'), getLead)
leadRouter.post('/post-lead', userAuth, hasPermission('lead', 'create'), postLead)
leadRouter.put('/put-lead/:id', userAuth, hasPermission('lead', 'update'), putLead)
leadRouter.patch('/patch-lead/:id', userAuth, hasPermission('lead', 'update'), patchLead)
leadRouter.delete('/delete-lead/:id', userAuth, hasPermission('lead', 'delete'), deleteLead)

export default leadRouter