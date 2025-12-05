import dataModel from '../models/dataModel.js'

export const getAllData = async (req, res) => {
    try {
        const getAllData = await dataModel.find()

        return res.json({success: true, message: 'All data fetched successfully', getAllData})
    }
    catch (error) {
        return res.json({success: false, message: error.message})
    }
}

export const getData = async (req, res) => {
    try {
        const id = req.params.id
        if (!id) {
            return res.json({success:false, message: 'Missing details'})
        }

        const getData = await dataModel.findById(id)
        if (!getData) {
            return res.json({success: false, message: 'Data not found'})
        }

        return res.json({success: true, message: 'Data fetched successfully', getData})
    }
    catch (error) {
        return res.json({success: false, message: error.message})
    }
}

export const postData = async (req, res) => {
    try {
        const {name, details} = req.body
        if (!name, !details) {
            return res.json({success: false, message: 'Missing details'})
        }

        const postData = new dataModel({name, details})
        await postData.save()

        return res.json({success: true, message: 'Data created successfully'})
    }
    catch (error) {
        return res.json({success: false, message: error.message})
    }
}

export const putData = async (req, res) => {
    try {
        const id = req.params.id
        if (!id) {
            return res.json({success: false, message: 'Missing details'})
        }

        const putData = await dataModel.findByIdAndUpdate(
            id,
            req.body,
            {new: true, overwrite: true, runValidators: true}
        )
        if (!putData) {
            return res.json({success: false, message: 'Data not found'})
        }

        return res.json({success: true, message: 'Data updated successfully'})
    }
    catch (error) {
        return res.json({success: false, message: error.message})
    }
}

export const patchData = async (req, res) => {
    try {
        const id = req.params.id
        if (!id) {
            return res.json({success: false, message: 'Missing details'})
        }

        const patchData = await dataModel.findByIdAndUpdate(
            id,
            {$set: req.body},
            {new: true, runValidators: true}
        )
        if (!patchData) {
            return res.json({success: false, message: 'Data not found'})
        }

        return res.json({success: true, message: 'Data updated successfully'})
    }
    catch (error) {
        return res.json({success: false, message: error.message})
    }
}

export const deleteData = async (req, res) => {
    try {
        const id = req.params.id
        if (!id) {
            return res.json({success: false, message: 'Missing details'})
        }

        const deleteData = await dataModel.findByIdAndDelete(id)
        if (!deleteData) {
            return res.json({success: false, message: 'Data not found'})
        }
    }
    catch (error) {
        return res.json({success: false, message: error.message})
    }
}