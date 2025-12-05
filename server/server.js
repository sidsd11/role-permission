import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import cookieParser from 'cookie-parser'

import connectDB from './config/mongoDB.js'
import adminRouter from './routes/adminRoutes.js'
import authUserRouter from './routes/authUserRoutes.js'
import activityRouter from './routes/activityRoutes.js'
import dataRouter from './routes/dataRoutes.js'
import leadRouter from './routes/leadRoutes.js'
import propertyRouter from './routes/propertyRoutes.js'
import reportRouter from './routes/reportRoutes.js'
import systemRouter from './routes/systemRoutes.js'
import userRouter from './routes/userRoutes.js'
import roleRouter from './routes/roleRoutes.js'

const app = express()
const port = process.env.PORT || 3000

connectDB()

const allowedOrigins = ['http://localhost:5173']

app.use(cors({origin: allowedOrigins, credentials: true}))
app.use(express.json())
app.use(cookieParser())

app.listen(port, () => {
    console.log(`Server is listening on port: ${port}`)
})

app.use('/api/admin', adminRouter)
app.use('/api/authUser', authUserRouter)
app.use('/api/role', roleRouter)
/* Permission routes */
app.use('/api/activity', activityRouter)
app.use('/api/data', dataRouter)
app.use('/api/lead', leadRouter)
app.use('/api/property', propertyRouter)
app.use('/api/report', reportRouter)
app.use('/api/system', systemRouter)
app.use('/api/user', userRouter)