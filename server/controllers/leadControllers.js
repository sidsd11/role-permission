import leadModel from '../models/leadModel.js'

export const getAllLead = async (req, res) => {
    try {
        const getAllLead = await leadModel.find()

        return res.json({success: true, message: 'All lead fetched successfully', getAllLead})
    }
    catch (error) {
        return res.json({success: false, message: error.message})
    }
}

export const getLead = async (req, res) => {
    try {
        const id = req.params.id
        if (!id) {
            return res.json({success:false, message: 'Missing details'})
        }

        const getLead = await leadModel.findById(id)
        if (!getLead) {
            return res.json({success: false, message: 'Lead not found'})
        }

        return res.json({success: true, message: 'Lead fetched successfully', getLead})
    }
    catch (error) {
        return res.json({success: false, message: error.message})
    }
}

export const postLead = async (req, res) => {
    try {
        const {name, details} = req.body
        if (!name, !details) {
            return res.json({success: false, message: 'Missing details'})
        }

        const postLead = new leadModel({name, details})
        await postLead.save()

        return res.json({success: true, message: 'Lead created successfully'})
    }
    catch (error) {
        return res.json({success: false, message: error.message})
    }
}

export const putLead = async (req, res) => {
    try {
        const id = req.params.id
        if (!id) {
            return res.json({success: false, message: 'Missing details'})
        }

        const putLead = await leadModel.findByIdAndUpdate(
            id,
            req.body,
            {new: true, overwrite: true, runValidators: true}
        )
        if (!putLead) {
            return res.json({success: false, message: 'Lead not found'})
        }

        return res.json({success: true, message: 'Lead updated successfully'})
    }
    catch (error) {
        return res.json({success: false, message: error.message})
    }
}

export const patchLead = async (req, res) => {
    try {
        const id = req.params.id
        if (!id) {
            return res.json({success: false, message: 'Missing details'})
        }

        const patchLead = await leadModel.findByIdAndUpdate(
            id,
            {$set: req.body},
            {new: true, runValidators: true}
        )
        if (!patchLead) {
            return res.json({success: false, message: 'Lead not found'})
        }

        return res.json({success: true, message: 'Lead updated successfully'})
    }
    catch (error) {
        return res.json({success: false, message: error.message})
    }
}

export const deleteLead = async (req, res) => {
    try {
        const id = req.params.id
        if (!id) {
            return res.json({success: false, message: 'Missing details'})
        }

        const deleteLead = await leadModel.findByIdAndDelete(id)
        if (!deleteLead) {
            return res.json({success: false, message: 'Lead not found'})
        }
    }
    catch (error) {
        return res.json({success: false, message: error.message})
    }
}