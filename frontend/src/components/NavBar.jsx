import React from 'react'
import { Link } from 'react-router-dom'

const NavBar = () => {
  return (
    <div className='w-screen h-auto bg-gray-200 shadow-xl'>
        <div className='flex justify-between items-center max-w-[1300px] mx-auto p-4 '>
            <h1 className='text-2xl font-bold text-blue-9500 cursor-pointer'>DeviceManagement</h1>
            <ul className='flex gap-12 items-center'>
                <Link to="/"><li className='bg-red-500 px-4 py-2 rounded-md hover:shadow-lg text-white cursor-pointer hover:bg-red-600'>All Locations</li></Link>
                <Link to="/addLocation"><li className='bg-green-500 px-4 py-2 rounded-md hover:shadow-lg text-white cursor-pointer hover:bg-green-600'>Add Location</li></Link>
            </ul>
        </div>
    </div>
  )
}

export default NavBar