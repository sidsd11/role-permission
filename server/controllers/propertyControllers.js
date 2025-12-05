import propertyModel from '../models/propertyModel.js'

export const getAllProperty = async (req, res) => {
    try {
        const getAllProperty = await propertyModel.find()

        return res.json({success: true, message: 'All property fetched successfully', getAllProperty})
    }
    catch (error) {
        return res.json({success: false, message: error.message})
    }
}

export const getProperty = async (req, res) => {
    try {
        const id = req.params.id
        if (!id) {
            return res.json({success:false, message: 'Missing details'})
        }

        const getProperty = await propertyModel.findById(id)
        if (!getProperty) {
            return res.json({success: false, message: 'Property not found'})
        }

        return res.json({success: true, message: 'Property fetched successfully', getProperty})
    }
    catch (error) {
        return res.json({success: false, message: error.message})
    }
}

export const postProperty = async (req, res) => {
    try {
        const {name, details} = req.body
        if (!name, !details) {
            return res.json({success: false, message: 'Missing details'})
        }

        const postProperty = new propertyModel({name, details})
        await postProperty.save()

        return res.json({success: true, message: 'Property created successfully'})
    }
    catch (error) {
        return res.json({success: false, message: error.message})
    }
}

export const putProperty = async (req, res) => {
    try {
        const id = req.params.id
        if (!id) {
            return res.json({success: false, message: 'Missing details'})
        }

        const putProperty = await propertyModel.findByIdAndUpdate(
            id,
            req.body,
            {new: true, overwrite: true, runValidators: true}
        )
        if (!putProperty) {
            return res.json({success: false, message: 'Property not found'})
        }

        return res.json({success: true, message: 'Property updated successfully'})
    }
    catch (error) {
        return res.json({success: false, message: error.message})
    }
}

export const patchProperty = async (req, res) => {
    try {
        const id = req.params.id
        if (!id) {
            return res.json({success: false, message: 'Missing details'})
        }

        const patchProperty = await propertyModel.findByIdAndUpdate(
            id,
            {$set: req.body},
            {new: true, runValidators: true}
        )
        if (!patchProperty) {
            return res.json({success: false, message: 'Property not found'})
        }

        return res.json({success: true, message: 'Property updated successfully'})
    }
    catch (error) {
        return res.json({success: false, message: error.message})
    }
}

export const deleteProperty = async (req, res) => {
    try {
        const id = req.params.id
        if (!id) {
            return res.json({success: false, message: 'Missing details'})
        }

        const deleteProperty = await propertyModel.findByIdAndDelete(id)
        if (!deleteProperty) {
            return res.json({success: false, message: 'Property not found'})
        }
    }
    catch (error) {
        return res.json({success: false, message: error.message})
    }
}