import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Login from './pages/Login'
import Home from './pages/Home'

const App = () => {
    return (
        <div>
            <ToastContainer />
            <Routes>
                <Route path='/login' element={<Login />} />
                <Route path='/home' element={<Home />} />
                <Route path='*' element={<Navigate to='/login' replace />} />
            </Routes>
        </div>
    )
}

export default App