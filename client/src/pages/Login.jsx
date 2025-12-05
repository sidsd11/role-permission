import React, { useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext.jsx'
import axios from 'axios'
import { toast } from 'react-toastify'
import { Loader, User, Mail, Lock } from 'lucide-react'

const Login = () => {
    const navigate = useNavigate()
    const {backendUrl, isLoggedIn, setIsLoggedIn, getUserData, loading} = useContext(AppContext)

    const [state, setState] = useState('Login')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [userRole, setUserRole] = useState('')
    const [allRoles, setAllRoles] = useState([])

    const getAllRoles = async () => {
        try {
            const {data} = await axios.get(`${backendUrl}/api/role/get-all-role`)
            if (data.success) {
                setAllRoles(data.roles)
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
        try {
            e.preventDefault()

            axios.defaults.withCredentials = true

            if (state === 'Register') {
                const {data} = await axios.post(`${backendUrl}/api/authUser/register`, {name, email, password, role: userRole})
                if (data.success) {
                    navigate('/home')
                    toast.success(data.message)
                }
                else {
                    toast.error(data.message)
                }
            }
            else {
                const {data} = await axios.post(`${backendUrl}/api/authUser/login`, {email, password})
                if (data.success) {
                    setIsLoggedIn(true)
                    getUserData()
                    navigate('/home')
                }
                else {
                    toast.error(data.message)
                }
            }
        }
        catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(() => {
        const init = async () => {
            try {
                if (isLoggedIn) {
                    navigate('/')
                }
            }
            catch (error) {
                toast.error(error.message)
            }
        }
        init()
        getAllRoles()
    }, [])

    return (
        loading
        ? (
            <div className='flex flex-col items-center justify-center min-h-screen'>
                <h1 className='text-3xl text-center font-semibold text-black mb-5'>
                    Loading your page...
                </h1>
                <Loader className='animate-spin'/>
            </div>
        ) :
        (
            <div className='flex flex-col items-center justify-center min-h-screen'>

                <div className='flex flex-col items-center mt-20 px-4 text-center bg-slate-900 p-10 rounded-lg shadow-lg w-[70%] sm:w-96 text-indigo-300 text-sm'>
                    <h1 className='text-3xl text-center font-semibold text-white mb-5'>
                        Login
                    </h1>

                    <form onSubmit={onSubmitHandler}>
                        {/* Name */}
                        {
                            state === 'Register' && (
                                <div className='mb-4 flex items-center gap-3 w-full px-5 py-2 5 rounded-lg bg-[#333A5C]'>
                                    <User className='bg-transparent'/>
                                    <input type='text' onChange={e => setName(e.target.value)} value={name} className='bg-transparent outline-none text-white' placeholder='Enter your name' required/>
                                </div>
                            )
                        }

                        {/* Email */}
                        <div className='mb-4 flex items-center gap-3 w-full px-5 py-2 5 rounded-lg bg-[#333A5C]'>
                            <Mail className='bg-transparent'/>
                            <input type='email' onChange={e => setEmail(e.target.value)} value={email} className='bg-transparent outline-none text-white' placeholder='Enter your email' required/>
                        </div>

                        {/* Password */}
                        <div className='mb-4 flex items-center gap-3 w-full px-5 py-2 5 rounded-lg bg-[#333A5C]'>
                            <Lock className='bg-transparent'/>
                            <input type='password' onChange={e => setPassword(e.target.value)} value={password} className='bg-transparent outline-none text-white' placeholder='Enter your password' required/> 
                        </div>

                        {/* Role */}
                        {
                            state === 'Register' && (
                                <div className='mb-4 flex items-center gap-3 w-full px-5 py-2 5 rounded-lg bg-[#333A5C]'>
                                    <User className='bg-transparent'/>
                                    <select
                                    className='bg-transparent outline-none text-white'
                                    value={userRole}
                                    onChange={(e) => setUserRole(e.target.value)}
                                    name='role'
                                    required>
                                        <option value='' disabled className='text-black'>
                                            Select role
                                        </option>
                                        {
                                            Array.isArray(allRoles) && allRoles.map((r) => (
                                                <option key={r} value={r} className='text-black'>
                                                    {r}
                                                </option>
                                            ))
                                        }
                                    </select>
                                </div>
                            )
                        }

                        {/* Forgot password */}
                        {
                            state === 'Login' && (
                                <p onClick={() => navigate('/reset-password')} className='mb-4 text-indigo-500 cursor-pointer'>
                                    Forgot password?
                                </p>
                            )
                        }

                        {/* Submit */}
                        <button className='w-full py-2.5 rounded-full bg-linear-to-br from-indigo-500 to-indigo-900 text-white font-medium'>
                            {state}
                        </button>
                    </form>

                    {
                        state === 'Register' ? (
                            <p className='text-gray-400 text-center text-sm mt-4'>
                                Already have an account? <span onClick={() => setState('Login')} className='text-blue-400 cursor-pointer underline'>Login here</span>
                            </p>
                        ) : (
                            <p className='text-gray-400 text-center text-sm mt-4'>
                                Don't have an account? <span onClick={() => setState('Register')} className='text-blue-400 cursor-pointer underline'>Register here</span>
                            </p>
                        )
                    }
                </div>
            </div>
        )
    )
}

export default Login