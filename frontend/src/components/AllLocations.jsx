import React from 'react';
import { useNavigate } from 'react-router-dom';

const AllLocations = () => {


    const navigate = useNavigate();

    const locations = [
        {
            id: 1,
            name: 'John',
            city: 'New York',
        },
        {
            id: 2,
            name: 'Jane',
            city: 'Los Angeles',
        },
        {
            id: 3,
            name: 'Doe',
            city: 'Chicago',
        },
        {
            id: 4,
            name: 'Smith',
            city: 'Houston',
        },
        {
            id: 5,
            name: 'Emily',
            city: 'San Francisco',
        },
        {
            id: 6,
            name: 'Michael',
            city: 'Seattle',
        },
        {
            id: 7,
            name: 'Emma',
            city: 'Miami',
        },
        {
            id: 8,
            name: 'William',
            city: 'Boston',
        },
    ];

    const handleView = (locationId) => {
        navigate(`/location/${locationId}`);
    };

    return (
        <div className='max-w-[1300px] h-auto mx-auto'>
            <h1 className='text-center text-3xl font-semibold p-6'>All Locations</h1>
            <div className='grid lg:grid-cols-4 p-4 gap-4 grid-cols-2 sm:grid-cols-3'>
                {locations.map((location) => {
                    return (
                        <div className='bg-blue-400 p-12 gap-4 cursor-pointer hover:shadow-xl hover:bg-blue-500' key={location.id}>
                            <p>{location.id}</p>
                            <p>{location.name}</p>
                            <button onClick={() => handleView(location.id)} className='text-white text-lg bg-green-400 rounded-sm px-2 py-1'>View Location</button>
                        </div>    
                    );
                })}
            </div>
        </div>
    );
};

export default AllLocations;
