import mongoose from 'mongoose'

const dataSchema = new mongoose.Schema({
    name: {type: String, required: true},
    details: {type: String, required: true, unique: true}
}, {timestamps: true})

const dataModel = mongoose.models.data || mongoose.model('data', dataSchema)

export default dataModel