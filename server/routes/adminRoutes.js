import express from 'express'
import { createRole, deleteRole, editRole, getAllRole, getRole } from '../controllers/adminControllers.js'

const adminRouter = express.Router()

adminRouter.get('/get-all-role', getAllRole)
adminRouter.get('/get-role/:id', getRole)
adminRouter.post('/create-role', createRole)
adminRouter.patch('edit-role/:id', editRole)
adminRouter.delete('delete-role/:id', deleteRole)

export default adminRouter