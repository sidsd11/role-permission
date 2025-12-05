import mongoose from 'mongoose'

const leadSchema = new mongoose.Schema({
    name: {type: String, required: true},
    details: {type: String, required: true, unique: true}
}, {timestamps: true})

const leadModel = mongoose.models.lead || mongoose.model('lead', leadSchema)

export default leadModel