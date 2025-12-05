import reportModel from '../models/reportModel.js'

export const getAllReport = async (req, res) => {
    try {
        const getAllReport = await reportModel.find()

        return res.json({success: true, message: 'All report fetched successfully', getAllReport})
    }
    catch (error) {
        return res.json({success: false, message: error.message})
    }
}

export const getReport = async (req, res) => {
    try {
        const id = req.params.id
        if (!id) {
            return res.json({success:false, message: 'Missing details'})
        }

        const getReport = await reportModel.findById(id)
        if (!getReport) {
            return res.json({success: false, message: 'Report not found'})
        }

        return res.json({success: true, message: 'Report fetched successfully', getReport})
    }
    catch (error) {
        return res.json({success: false, message: error.message})
    }
}

export const postReport = async (req, res) => {
    try {
        const {name, details} = req.body
        if (!name, !details) {
            return res.json({success: false, message: 'Missing details'})
        }

        const postReport = new reportModel({name, details})
        await postReport.save()

        return res.json({success: true, message: 'Report created successfully'})
    }
    catch (error) {
        return res.json({success: false, message: error.message})
    }
}

export const putReport = async (req, res) => {
    try {
        const id = req.params.id
        if (!id) {
            return res.json({success: false, message: 'Missing details'})
        }

        const putReport = await reportModel.findByIdAndUpdate(
            id,
            req.body,
            {new: true, overwrite: true, runValidators: true}
        )
        if (!putReport) {
            return res.json({success: false, message: 'Report not found'})
        }

        return res.json({success: true, message: 'Report updated successfully'})
    }
    catch (error) {
        return res.json({success: false, message: error.message})
    }
}

export const patchReport = async (req, res) => {
    try {
        const id = req.params.id
        if (!id) {
            return res.json({success: false, message: 'Missing details'})
        }

        const patchReport = await reportModel.findByIdAndUpdate(
            id,
            {$set: req.body},
            {new: true, runValidators: true}
        )
        if (!patchReport) {
            return res.json({success: false, message: 'Report not found'})
        }

        return res.json({success: true, message: 'Report updated successfully'})
    }
    catch (error) {
        return res.json({success: false, message: error.message})
    }
}

export const deleteReport = async (req, res) => {
    try {
        const id = req.params.id
        if (!id) {
            return res.json({success: false, message: 'Missing details'})
        }

        const deleteReport = await reportModel.findByIdAndDelete(id)
        if (!deleteReport) {
            return res.json({success: false, message: 'Report not found'})
        }
    }
    catch (error) {
        return res.json({success: false, message: error.message})
    }
}