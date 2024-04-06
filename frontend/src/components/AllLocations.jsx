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
            console.log(response.data);
        } catch (error) {
            console.error("Error fetching locations:", error);
        }
    }
    

    const handleDelete = async (locationId) => {
        if (locationId) {
            try {
              const response = await axios.delete(`http://localhost:5000/api/location/${locationId}`);
                alert("Are you sure you want to delete");
                fetchLocations(response.data);
                console.log(response.data.message);
            } catch (error) {
                console.log(error);
            }
        }

    }

    useEffect(() => {
        fetchLocations();
    }, [])

    const handleView = (productId) => {
        navigate(`/location/${productId}`);
    };

    return (
        <div className='max-w-[1300px] h-auto mx-auto'>
            <h1 className='p-6 text-3xl font-semibold text-center'>All Locations</h1>
            <div className='grid grid-cols-2 gap-4 p-4 lg:grid-cols-4 sm:grid-cols-3'>
                {locations.map((location) => {
                    return (
                        <div key={location._id} className='gap-4 p-6 duration-150 bg-gray-200 cursor-pointer hover:shadow-xl hover:bg-gray-300' >
                            <p className='p-2 text-xl font-semibold text-gray-600'>{location.name}</p>
                            <div className='flex items-center gap-4'>
                                <button onClick={() => handleView(location._id)} className='px-2 py-1 text-lg text-white duration-150 rounded-sm bg-violet-500 hover:bg-violet-600'>View</button>
                                <button onClick={() => handleDelete(location._id)} className='px-2 py-1 text-lg text-white duration-150 bg-red-500 rounded-sm hover:bg-red-600'>Delete</button>
                            </div>

                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default AllLocations;
