import mongoose from 'mongoose'

const roleSchema = new mongoose.Schema({
    roleName: {type: String, required: true, unique: true},
    description: {type: String},
    permissions: {
        user: {
            create: Boolean,
            read: Boolean,
            update: Boolean,
            delete: Boolean
        },
        lead: {
            create: Boolean,
            read: Boolean,
            update: Boolean,
            delete: Boolean
        },
        property: {
            create: Boolean,
            read: Boolean,
            update: Boolean,
            delete: Boolean
        },
        activity: {
            create: Boolean,
            read: Boolean,
            update: Boolean,
            delete: Boolean
        },
        system: {
            create: Boolean,
            read: Boolean,
            update: Boolean,
            delete: Boolean
        },
        report : {
            create: Boolean,
            read: Boolean,
            update: Boolean,
            delete: Boolean
        },
        data: {
            create: Boolean,
            read: Boolean,
            update: Boolean,
            delete: Boolean
        }
    }
}, {timestamps: true})

const roleModel = mongoose.models.role || mongoose.model('role', roleSchema)

export default roleModel