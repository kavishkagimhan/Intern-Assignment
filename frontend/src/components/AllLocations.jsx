import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const AllLocations = () => {


    const navigate = useNavigate();
    const [locations, setLocations] = useState([]);




    const fetchLocations = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/location/');
            setLocations(response.data);
            response.data.forEach(location => {
                console.log(location.devices);
            });
        } catch (error) {
            console.error("Error fetching locations:", error);
        }
    }



    useEffect(() => {
        fetchLocations();
    }, [])

    const handleView = (locationId) => {
        navigate(`/location/${locationId}`);
    };

    return (
        <div className='max-w-[1300px] h-auto mx-auto'>
            <h1 className='text-center text-3xl font-semibold p-6'>All Locations</h1>
            <div className='grid lg:grid-cols-4 p-4 gap-4 grid-cols-2 sm:grid-cols-3'>
                {locations.map((location) => {
                    return (
                        <div key={location._id} className='bg-blue-400 p-12 gap-4 cursor-pointer hover:shadow-xl hover:bg-blue-500' >
                            <p>{location.name}</p>

                            <button onClick={() => handleView(location._id)} className='text-white text-lg bg-green-400 rounded-sm px-2 py-1'>View Location</button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default AllLocations;
