import mongoose from 'mongoose'

const propertySchema = new mongoose.Schema({
    name: {type: String, required: true},
    details: {type: String, required: true, unique: true}
}, {timestamps: true})

const propertyModel = mongoose.models.property || mongoose.model('property', propertySchema)

export default propertyModel