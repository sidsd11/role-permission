import roleModel from '../models/roleModel.js'

export const getAllRole = async (req, res) => {
    try {
        const getAllRole = await roleModel.find()

        return res.json({success: true, message: 'Role fetched successfully', getAllRole})
    }
    catch (error) {
        return res.json({success: false, message: error.message})
    }
}

export const getRole = async (req, res) => {
    try {
        const id = req.params.id
        if (!id) {
            return res.json({success: false, message: 'Missing details'})
        }

        const getRole = await roleModel.findById(id)
        if (!getRole) {
            return res.json({success: false, message: 'Role not found'})
        }

        return res.json({success: true, message: 'All roles fetched successfully', getRole})
    }
    catch (error) {
        return res.json({success: false, message: error.message})
    }
}

export const createRole = async (req, res) => {
    try {
        const {roleName, description, permissions} = req.body
        if (!roleName || !description || !permissions) {
            return res.json({success: false, message: 'Missing details'})
        }

        const roleCheck = await roleModel.findOne({roleName})
        if (roleCheck) {
            return res.json({success: false, message: 'Role already exists'})
        }

        const createRole = new roleModel({roleName, description, permissions})
        await createRole.save()

        return res.json({success: true, message: 'Role created successfully'})
    }
    catch (error) {
        return res.json({success: false, message: error.message})
    }
}

export const editRole = async (req, res) => {
    try {
        const id = req.params.id
        if (!id) {
            return res.json({success: false, message: 'Missing details'})
        }

        const selectedRole = await roleModel.findByIdAndUpdate(
            id,
            {$set: req.body},
            {new: true, runValidators: true}
        )
        if (!selectedRole) {
            return res.json({success: false, message: 'Activity not found'})
        }

        return res.json({success: true, message: 'Activity updated successfully'})
    }
    catch (error) {
        return res.json({success: false, message: error.message})
    }
}

export const deleteRole = async (req, res) => {
    try {
        const id = req.params.id
        if (!id) {
            return res.json({success: false, message: 'Missing details'})
        }

        const selectedRole = await roleModel.findByIdAndDelete()
        if (!selectedRole) {
            return res.json({success: false, message: 'Activity not found'})
        }

        return res.json({success: true, message: 'Activity deleted successfully'})
    }
    catch (error) {
        return res.json({success: false, message: error.message})
    }
}