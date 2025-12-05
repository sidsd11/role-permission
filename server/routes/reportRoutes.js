import express from 'express'
import { deleteReport, getReport, getAllReport, patchReport, postReport, putReport } from '../controllers/reportControllers.js'
import userAuth from '../middleware/authUser.js'
import hasPermission from '../middleware/permissionCheck.js'

const reportRouter = express.Router()

reportRouter.get('/get-all-report', userAuth, hasPermission('report', 'read'), getAllReport)
reportRouter.get('/get-report/:id', userAuth, hasPermission('report', 'read'), getReport)
reportRouter.post('/post-report', userAuth, hasPermission('report', 'create'), postReport)
reportRouter.put('/put-report/:id', userAuth, hasPermission('report', 'update'), putReport)
reportRouter.patch('/patch-report/:id', userAuth, hasPermission('report', 'update'), patchReport)
reportRouter.delete('/delete-report/:id', userAuth, hasPermission('report', 'delete'), deleteReport)

export default reportRouter