import mongoose from 'mongoose'

const authUserSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    role: {type: String, required: true}
}, {timestamps: true})

const authUserModel = mongoose.models.authUser || mongoose.model('authUser', authUserSchema)

export default authUserModel