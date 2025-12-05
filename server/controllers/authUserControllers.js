import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import authUserModel from '../models/authUserModel.js'

export const register = async (req, res) => {
    try {
        const {name, email, password, role} = req.body
        console.log(req.body)
        if (!name || !email || !password || !role) {
            return res.json({success: false, message: 'Missing details'})
        }

        const userCheck = await authUserModel.findOne({email})
        if (userCheck) {
            return res.json({success: false, message: 'User already exists'})
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = new authUserModel({name, email, password: hashedPassword, role})
        await newUser.save()

        return res.json({success: true, message: 'User created successfully'})
    }
    catch (error) {
        return res.json({success: false, message: error.message})
    }
}

export const login = async (req, res) => {
    try {
        const {email, password} = req.body
        if (!email || !password) {
            return res.json({success: false, message: 'Missing details'})
        }

        const user = await authUserModel.findOne({email})
        if (!user) {
            return res.json({success: false, message: 'User not found'})
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.json({success: false, message: 'Invalid credentials'})
        }

        const token = jwt.sign({id: user._id}, process.env.SECRET_TEXT, {expiresIn: '1d'})
        res.cookie('token', token, {
            httpOnly: false,
            secure: true,
            sameSite: true,
            maxAge: 1 * 24 * 60 * 60 * 1000
        })

        return res.json({success: true, message: 'User logged in successfully'})
    }
    catch (error) {
        return res.json({success: false, message: error.message})
    }
}

export const logout = async (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: true,
            sameSite: true
        })

        return res.json({success: true, message: 'User logged out successfully'})
    }
    catch (error) {
        return res.json({success: false, message: error.message})
    }
}

export const isAuth = async (req, res) => {
    try {
        return res.json({success: true, message: 'User is authenticated'})
    }
    catch (error) {
        return res.json({success: false, message: error.message})
    }    
}

export const getUserData = async (req, res) => {
    try {
        const userId = req.user.id
        if (!userId) {
            return res.json({success: false, message: 'Missing details'})
        }

        const user = await authUserModel.findById(userId)
        if (!user) {
            return res.json({success: false, message: 'User not found'})
        }

        return res.json({success: true, message: 'User found', userData: user})
    }
    catch (error) {
        return res.json({success: false, message: error.message})
    }
}