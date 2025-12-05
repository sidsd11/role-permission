import systemModel from '../models/systemModel.js'

export const getAllSystem = async (req, res) => {
    try {
        const getAllSystem = await systemModel.find()

        return res.json({success: true, message: 'All system fetched successfully', getAllSystem})
    }
    catch (error) {
        return res.json({success: false, message: error.message})
    }
}

export const getSystem = async (req, res) => {
    try {
        const id = req.params.id
        if (!id) {
            return res.json({success:false, message: 'Missing details'})
        }

        const getSystem = await systemModel.findById(id)
        if (!getSystem) {
            return res.json({success: false, message: 'System not found'})
        }

        return res.json({success: true, message: 'System fetched successfully', getSystem})
    }
    catch (error) {
        return res.json({success: false, message: error.message})
    }
}

export const postSystem = async (req, res) => {
    try {
        const {name, details} = req.body
        if (!name, !details) {
            return res.json({success: false, message: 'Missing details'})
        }

        const postSystem = new systemModel({name, details})
        await postSystem.save()

        return res.json({success: true, message: 'System created successfully'})
    }
    catch (error) {
        return res.json({success: false, message: error.message})
    }
}

export const putSystem = async (req, res) => {
    try {
        const id = req.params.id
        if (!id) {
            return res.json({success: false, message: 'Missing details'})
        }

        const putSystem = await systemModel.findByIdAndUpdate(
            id,
            req.body,
            {new: true, overwrite: true, runValidators: true}
        )
        if (!putSystem) {
            return res.json({success: false, message: 'System not found'})
        }

        return res.json({success: true, message: 'System updated successfully'})
    }
    catch (error) {
        return res.json({success: false, message: error.message})
    }
}

export const patchSystem = async (req, res) => {
    try {
        const id = req.params.id
        if (!id) {
            return res.json({success: false, message: 'Missing details'})
        }

        const patchSystem = await systemModel.findByIdAndUpdate(
            id,
            {$set: req.body},
            {new: true, runValidators: true}
        )
        if (!patchSystem) {
            return res.json({success: false, message: 'System not found'})
        }

        return res.json({success: true, message: 'System updated successfully'})
    }
    catch (error) {
        return res.json({success: false, message: error.message})
    }
}

export const deleteSystem = async (req, res) => {
    try {
        const id = req.params.id
        if (!id) {
            return res.json({success: false, message: 'Missing details'})
        }

        const deleteSystem = await systemModel.findByIdAndDelete(id)
        if (!deleteSystem) {
            return res.json({success: false, message: 'System not found'})
        }
    }
    catch (error) {
        return res.json({success: false, message: error.message})
    }
}