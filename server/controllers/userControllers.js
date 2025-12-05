import userModel from '../models/userModel.js'

export const getAllUser = async (req, res) => {
    try {
        const getAllUser = await userModel.find()

        return res.json({success: true, message: 'All user fetched successfully', getAllUser})
    }
    catch (error) {
        return res.json({success: false, message: error.message})
    }
}

export const getUser = async (req, res) => {
    try {
        const id = req.params.id
        if (!id) {
            return res.json({success:false, message: 'Missing details'})
        }

        const getUser = await userModel.findById(id)
        if (!getUser) {
            return res.json({success: false, message: 'User not found'})
        }

        return res.json({success: true, message: 'User fetched successfully', getUser})
    }
    catch (error) {
        return res.json({success: false, message: error.message})
    }
}

export const postUser = async (req, res) => {
    try {
        const {name, details} = req.body
        if (!name, !details) {
            return res.json({success: false, message: 'Missing details'})
        }

        const postUser = new userModel({name, details})
        await postUser.save()

        return res.json({success: true, message: 'User created successfully'})
    }
    catch (error) {
        return res.json({success: false, message: error.message})
    }
}

export const putUser = async (req, res) => {
    try {
        const id = req.params.id
        if (!id) {
            return res.json({success: false, message: 'Missing details'})
        }

        const putUser = await userModel.findByIdAndUpdate(
            id,
            req.body,
            {new: true, overwrite: true, runValidators: true}
        )
        if (!putUser) {
            return res.json({success: false, message: 'User not found'})
        }

        return res.json({success: true, message: 'User updated successfully'})
    }
    catch (error) {
        return res.json({success: false, message: error.message})
    }
}

export const patchUser = async (req, res) => {
    try {
        const id = req.params.id
        if (!id) {
            return res.json({success: false, message: 'Missing details'})
        }

        const patchUser = await userModel.findByIdAndUpdate(
            id,
            {$set: req.body},
            {new: true, runValidators: true}
        )
        if (!patchUser) {
            return res.json({success: false, message: 'User not found'})
        }

        return res.json({success: true, message: 'User updated successfully'})
    }
    catch (error) {
        return res.json({success: false, message: error.message})
    }
}

export const deleteUser = async (req, res) => {
    try {
        const id = req.params.id
        if (!id) {
            return res.json({success: false, message: 'Missing details'})
        }

        const deleteUser = await userModel.findByIdAndDelete(id)
        if (!deleteUser) {
            return res.json({success: false, message: 'User not found'})
        }
    }
    catch (error) {
        return res.json({success: false, message: error.message})
    }
}