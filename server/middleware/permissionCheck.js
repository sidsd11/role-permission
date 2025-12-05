import roleModel from '../models/roleModel.js'

const hasPermission = (type, operation) => {
    return async (req, res, next) => {
        const currUserRole = req.user?.role
        if (!currUserRole) {
            return res.json({success: false, message: 'Role not given'})
        }

        const roleData = await roleModel.findOne({roleName: currUserRole})
        if (!roleData)  {
            return res.json({success: false, message: 'Role not found'})
        }

        const permissions = roleData.permissions
        const canAccess = permissions[type]?.[operation]
        if (!canAccess) {
            return res.json({success: false, message: 'Access denied'})
        }

        next()
    }
}

export default hasPermission