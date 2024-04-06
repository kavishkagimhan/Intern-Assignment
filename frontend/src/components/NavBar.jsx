import React from 'react'
import { Link } from 'react-router-dom'

const NavBar = () => {
  return (
    <div className='w-screen h-auto bg-gray-200 shadow-xl'>
        <div className='flex justify-between items-center max-w-[1300px] mx-auto p-4 '>
            <h1 className='text-2xl font-bold cursor-pointer text-blue-9500'>DeviceManagement</h1>
            <ul className='flex items-center gap-12'>
                <Link to="/"><li className='px-4 py-2 text-white rounded-md cursor-pointer bg-violet-500 hover:shadow-lg hover:bg-violet-600'>All Locations</li></Link>
                <Link to="/addLocation"><li className='px-4 py-2 text-white rounded-md cursor-pointer bg-violet-600 hover:shadow-lg hover:bg-violet-700'>Add Location</li></Link>
            </ul>
        </div>
    </div>
  )
}

export default NavBar