import express from 'express'
import { getAllRole } from '../controllers/roleControllers.js'

const roleRouter = express.Router()

roleRouter.get('/get-all-role', getAllRole)

export default roleRouter