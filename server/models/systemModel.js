import mongoose from 'mongoose'

const systemSchema = new mongoose.Schema({
    name: {type: String, required: true},
    details: {type: String, required: true, unique: true}
}, {timestamps: true})

const systemModel = mongoose.models.system || mongoose.model('system', systemSchema)

export default systemModel