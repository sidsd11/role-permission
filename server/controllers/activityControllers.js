import activityModel from '../models/activityModel.js'

export const getAllActivity = async (req, res) => {
    try {
        const getAllActivity = await activityModel.find()

        return res.json({success: true, message: 'All activity fetched successfully', getAllActivity})
    }
    catch (error) {
        return res.json({success: false, message: error.message})
    }
}

export const getActivity = async (req, res) => {
    try {
        const id = req.params.id
        if (!id) {
            return res.json({success:false, message: 'Missing details'})
        }

        const getActivity = await activityModel.findById(id)
        if (!getActivity) {
            return res.json({success: false, message: 'Activity not found'})
        }

        return res.json({success: true, message: 'Activity fetched successfully', getActivity})
    }
    catch (error) {
        return res.json({success: false, message: error.message})
    }
}

export const postActivity = async (req, res) => {
    try {
        const {name, details} = req.body
        if (!name, !details) {
            return res.json({success: false, message: 'Missing details'})
        }

        const postActivity = new activityModel({name, details})
        await postActivity.save()

        return res.json({success: true, message: 'Activity created successfully'})
    }
    catch (error) {
        return res.json({success: false, message: error.message})
    }
}

export const putActivity = async (req, res) => {
    try {
        const id = req.params.id
        if (!id) {
            return res.json({success: false, message: 'Missing details'})
        }

        const putActivity = await activityModel.findByIdAndUpdate(
            id,
            req.body,
            {new: true, overwrite: true, runValidators: true}
        )
        if (!putActivity) {
            return res.json({success: false, message: 'Activity not found'})
        }

        return res.json({success: true, message: 'Activity updated successfully'})
    }
    catch (error) {
        return res.json({success: false, message: error.message})
    }
}

export const patchActivity = async (req, res) => {
    try {
        const id = req.params.id
        if (!id) {
            return res.json({success: false, message: 'Missing details'})
        }

        const patchActivity = await activityModel.findByIdAndUpdate(
            id,
            {$set: req.body},
            {new: true, runValidators: true}
        )
        if (!patchActivity) {
            return res.json({success: false, message: 'Activity not found'})
        }

        return res.json({success: true, message: 'Activity updated successfully'})
    }
    catch (error) {
        return res.json({success: false, message: error.message})
    }
}

export const deleteActivity = async (req, res) => {
    try {
        const id = req.params.id
        if (!id) {
            return res.json({success: false, message: 'Missing details'})
        }

        const deleteActivity = await activityModel.findByIdAndDelete(id)
        if (!deleteActivity) {
            return res.json({success: false, message: 'Activity not found'})
        }
    }
    catch (error) {
        return res.json({success: false, message: error.message})
    }
}