import mongoose from 'mongoose'

const activitySchema = new mongoose.Schema({
    name: {type: String, required: true},
    details: {type: String, required: true, unique: true}
}, {timestamps: true})

const activityModel = mongoose.models.activity || mongoose.model('activity', activitySchema)

export default activityModel