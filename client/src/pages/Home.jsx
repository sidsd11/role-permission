import React, { useContext, useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext.jsx'
import { toast } from 'react-toastify'
import { Loader, CirclePlus } from 'lucide-react'

const Home = () => {
    const navigate = useNavigate()
    const {backendUrl, isLoggedIn, userData, getUserData, authLoading, setIsLoggedIn, setUserData} = useContext(AppContext)

    const [addRoleCheck, setAddRoleCheck] = useState(false)
    const [roleName, setRoleName] = useState('')
    const [description, setDescription] = useState('')
    const [permissions, setPermissions] = useState({
        user: { create: false, read: false, update: false, delete: false },
        lead: { create: false, read: false, update: false, delete: false },
        property: { create: false, read: false, update: false, delete: false },
        activity: { create: false, read: false, update: false, delete: false },
        system: { create: false, read: false, update: false, delete: false },
        report: { create: false, read: false, update: false, delete: false },
        data: { create: false, read: false, update: false, delete: false },
    })

    const toggle = (group, field) => {
        setPermissions({
        ...permissions,
        [group]: {
            ...permissions[group],
            [field]: !permissions[group][field],
        },
        })
    }

    const permissionSection = (title, groupKey, items) => {
        return (
        <div className='border rounded-lg p-6 mb-6 bg-gray-50'>
            <h3 className='font-semibold text-lg mb-4'>{title}</h3>

            <div className='grid grid-cols-2 md:grid-cols-4 gap-3'>
            {
                items.map(([key, label]) => (
                    <label key={key} className='flex items-center space-x-2 hover:scale-110 transition-all'>
                        <input
                        type='checkbox'
                        checked={permissions[groupKey][key]}
                        onChange={() => toggle(groupKey, key)}
                        className='h-4 w-4 text-blue-600 cursor-pointer'
                        />
                        <span className='cursor-pointer'>{label}</span>
                    </label>
                ))
            }
            </div>
        </div>
        )
    }

    const logout = async () => {
        try {
            axios.defaults.withCredentials = true

            const {data} = await axios.post(`${backendUrl}/api/authUser/logout`)
            if (data.success) {
                setIsLoggedIn(false)
                setUserData(null)
                navigate('/')
            }
            else {
                toast.error(data.message)
            }
        }
        catch (error) {
            toast.error(error.message)
        }
    }

    const onSubmitHandler = async (e) => {
        e.preventDefault()
        try {
            const newRoleData = { roleName, description, permissions }

            const {data} = await axios.post(`${backendUrl}/api/admin/create-role`, newRoleData)
            if (data.success) {
                toast.success(data.message)
                setRoleName('')
                setDescription('')
                setPermissions({
                    user: { create: false, read: false, update: false, delete: false },
                    lead: { create: false, read: false, update: false, delete: false },
                    property: { create: false, read: false, update: false, delete: false },
                    activity: { create: false, read: false, update: false, delete: false },
                    system: { create: false, read: false, update: false, delete: false },
                    report: { create: false, read: false, update: false, delete: false },
                    data: { create: false, read: false, update: false, delete: false },
                })
            }
            else {
                toast.error(data.message)
            }
        }
        catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(() => {
        if (authLoading) return
        if (!isLoggedIn) {
            navigate('/')
            return
        }
        getUserData()
    }, [authLoading, isLoggedIn])

    return (
        authLoading
        ? (
            <div className='flex flex-col items-center justify-center min-h-screen'>
                <h1 className='text-3xl text-center font-semibold text-black mb-5'>
                    Loading your page...
                </h1>
                <Loader className='animate-spin'/>
            </div>
        ) :
        (
            addRoleCheck
            ? (
                <div className='max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8 mt-10'>
                    <button
                    className='cursor-pointer border p-3 rounded-lg bg-blue-600 hover:bg-blue-700 hover:scale-110 text-white transition-all'
                    onClick={logout}>
                        Logout
                    </button>

                    <form onSubmit={onSubmitHandler}>
                        <h2 className='text-2xl font-semibold mb-6'>Add New Role</h2>

                        {/* Role Inputs */}
                        <div className='grid grid-cols-2 gap-6 mb-8'>
                            <input
                            type='text'
                            placeholder='Enter role name'
                            className='border rounded-lg px-4 py-3 focus:ring focus:ring-blue-300'
                            value={roleName}
                            onChange={(e) => setRoleName(e.target.value)}
                            required />

                            <input
                            type='text'
                            placeholder='Enter role description'
                            className='border rounded-lg px-4 py-3 focus:ring focus:ring-blue-300'
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required />
                        </div>

                        {/* Permission Blocks */}
                        {permissionSection('User Permissions', 'user', [
                            ['create', 'Create Users'],
                            ['read', 'View Users'],
                            ['update', 'Update Users'],
                            ['delete', 'Delete Users'],
                        ])}

                        {permissionSection('Lead Permissions', 'lead', [
                            ['create', 'Create Leads'],
                            ['read', 'View Leads'],
                            ['update', 'Update Leads'],
                            ['delete', 'Delete Leads'],
                        ])}

                        {permissionSection('Property Permissions', 'property', [
                            ['create', 'Create Properties'],
                            ['read', 'View Properties'],
                            ['update', 'Update Properties'],
                            ['delete', 'Delete Properties'],
                        ])}

                        {permissionSection('Activity Permissions', 'activity', [
                            ['create', 'Create Activities'],
                            ['read', 'View Activities'],
                            ['update', 'Update Activities'],
                            ['delete', 'Delete Activities'],
                        ])}

                        {permissionSection('System Permissions', 'system', [
                            ['create', 'Create System'],
                            ['read', 'View System'],
                            ['update', 'Update System'],
                            ['delete', 'Delete System'],
                        ])}

                        {permissionSection('Report Permissions', 'report', [
                            ['create', 'Create Report'],
                            ['read', 'View Report'],
                            ['update', 'Update Report'],
                            ['delete', 'Delete Report'],
                        ])}

                        {permissionSection('Data Permissions', 'data', [
                            ['create', 'Create Data'],
                            ['read', 'View Data'],
                            ['update', 'Update Data'],
                            ['delete', 'Delete Data'],
                        ])}

                        {/* Buttons */}
                        <div className='mt-8 flex gap-4'>
                            <button
                            type='submit'
                            className='bg-blue-600 hover:bg-blue-700 hover:scale-110 transition-all text-white px-6 py-3 rounded-lg cursor-pointer'
                            >
                                Create Role
                            </button>

                            <button
                            type='button'
                            className='bg-gray-300 hover:bg-gray-400 hover:scale-110 text-black px-6 py-3 rounded-lg cursor-pointer'
                            onClick={() => setAddRoleCheck(false)}>
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            ) :
            (
                <div className='flex flex-col items-center justify-center min-h-screen'>
                    <h1 className='text-3xl text-center tet-black'>Hi {userData?.role}!</h1>
                    <p className='text-xl text-center tet-black'>Right now, it supports login for all roles, but only admin can create a new role with all the permissions.s</p>
                    <div className='flex gap-5'>
                        {
                            userData?.role === 'admin' &&
                            <button
                            className='flex items-center justify-center gap-2 cursor-pointer border p-3 rounded-lg bg-blue-600 hover:bg-blue-700 hover:scale-110 text-white transition-all'
                            onClick={() => setAddRoleCheck(true)}>
                                <CirclePlus className='size-5' /> Add a new Role
                            </button>
                        }
                        <button
                        className='cursor-pointer border p-3 rounded-lg bg-blue-600 hover:bg-blue-700 hover:scale-110 text-white transition-all'
                        onClick={logout}>
                            Logout
                        </button>
                    </div>
                </div>
            )
        )
    )
}

export default Home