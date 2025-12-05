import mongoose from 'mongoose'

const reportSchema = new mongoose.Schema({
    name: {type: String, required: true},
    details: {type: String, required: true, unique: true}
}, {timestamps: true})

const reportModel = mongoose.models.report || mongoose.model('report', reportSchema)

export default reportModel