import jwt from 'jsonwebtoken'
import authUserModel from '../models/authUserModel.js'

const userAuth = async (req, res, next) => {
    try {
        const {token} = req.cookies

        if (!token) {
            return res.json({success: false, message: 'Not authorized.'})
        }

        const tokenDecode = jwt.verify(token, process.env.SECRET_TEXT)
        const user = await authUserModel.findById(tokenDecode.id)
        if (!user) {
            return res.json({success: false, message: 'User not found'})
        }

        req.user = {
            id: user._id,
            role: user.role
        }

        next()
    }
    catch (error) {
        return res.json({success: false, message: error.message})
    }
}

export default userAuth