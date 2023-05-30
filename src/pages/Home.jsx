import React from 'react'
import { useSelector } from 'react-redux'

const Home = () => {
    const loggedInUserDetails = useSelector(state => state.auth.existingUserCredentials)
    return (
        <div className='bg-slate-800 h-[100vh] w-[100vw] text-white'>
            <p className='font-bold text-6xl'>Welcome, {loggedInUserDetails?.username}</p>
        </div>
    )
}

export default Home