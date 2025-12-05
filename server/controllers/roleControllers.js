import roleModel from '../models/roleModel.js'

export const getAllRole = async (req, res) => {
    try {
        const getAllRole = await roleModel.distinct('roleName')
        const filteredRoles = getAllRole.filter(r => r !== 'Admin')

        return res.json({success: true, message: 'Role fetched successfully', roles: filteredRoles})
    }
    catch (error) {
        return res.json({success: false, message: error.message})
    }
}