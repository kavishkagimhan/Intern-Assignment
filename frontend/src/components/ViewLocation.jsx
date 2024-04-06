import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import AddDevice from './AddDevice'; 

const ViewLocation = (props) => {
    const { id } = useParams();
    const [location, setLocation] = useState({});
    const [showAddDeviceDialog, setShowAddDeviceDialog] = useState(false); 

    const getLocation = async () => {
        if (id) {
            try {
                const res = await axios.get(`http://localhost:5000/api/location/${id}`);
                setLocation(res.data);
                console.log(res.data);
            } catch (e) {
                console.log(e.message);
            }
        } else {
            console.log("Location id not found");
        }
    };

    useEffect(() => {
        getLocation();
    }, []);

    // Function to convert image URL format
    const convertImageUrl = (imageUrl) => {
        const parts = imageUrl.split('\\');
        return `http://localhost:5000/${parts.slice(1).join('/')}`;
    };

    const handleDelete = (deviceId) => {
        try{
            const res = axios.delete(`http://localhost:5000/api/location/${id}/devices/${deviceId}`)
            alert("Are you sure delete");
            getLocation();
            console.log(res);
            ge
        }catch(e) {
            console.log("Error deleting location".e);
        }
    }

    return (
        <div className='w-screen h-auto'>
            <div className='max-w-[1300px] mx-auto bg-gray-100 shadow-md rounded-lg p-4 mt-12'>
                {location && (
                    <div className='flex flex-col gap-2'>
                        <h1 className='text-xl font-semibold'>Name: {location.name}</h1>
                        <p>Address: {location.address}</p>
                        <p>Phone: {location.phone}</p>
                    </div>
                )}

                <div className='mt-8 text-xl'>
                    <div className='flex items-center justify-between'>
                        <h1 className='font-semibold'>Associated devices</h1>
                        <button onClick={() => setShowAddDeviceDialog(true)} className='px-2 py-1 text-lg text-white duration-150 rounded-sm bg-fuchsia-500 hover:bg-fuchsia-600'>Add New Device</button>
                    </div>

                    <div className="grid grid-cols-4 gap-4 mt-4">
                        {location.devices && location.devices.map(device => (
                            <div key={device._id} className="p-4 bg-white border-2 border-blue-500 rounded-md shadow-xl">
                                <p className="font-bold text-left">Serial Number: {device.serialNumber}</p>
                                <img src={convertImageUrl(device.image)} alt={device.type} className="w-24 h-24 mx-auto mb-2" />
                                <p className="font-medium twxt-lg">Type: {device.type}</p>
                                <div className='flex justify-between'>
                                    <p className="text-left">Status: </p>
                                    <div>
                                        {/* Conditionally render status text based on device status */}
                                        {device.status === 'active' ? (
                                            <div className='font-bold text-green-500'>Active</div>
                                        ) : (
                                            <div className='font-bold text-red-500'>Inactive</div>
                                        )}
                                    </div>
                                </div>
                                <button onClick={() => {handleDelete(device._id)}} className='px-4 py-2 text-sm font-semibold text-white bg-red-600 hover:underline'>Remove</button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {showAddDeviceDialog && <AddDevice onClose={() => setShowAddDeviceDialog(false)} locationId={id} refreshList={getLocation} /> }
        </div>
    )
}

export default ViewLocation;
