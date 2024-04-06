import React, { useState } from 'react';
import axios from 'axios';

const AddDevice = ({ onClose, locationId, refreshList }) => {
    const [formData, setFormData] = useState({
        serialNumber: '',
        type: '',
        image: null,
        status: ''
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setFormData({
            ...formData,
            image: file
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        // Validate fields
        if (!formData.serialNumber || !formData.type || !formData.image || !formData.status) {
            setError('All fields are required');
            return;
        }

        try {
            const formDataToSend = new FormData();
            formDataToSend.append('serialNumber', formData.serialNumber);
            formDataToSend.append('type', formData.type);
            formDataToSend.append('image', formData.image);
            formDataToSend.append('status', formData.status);

            await axios.post(`http://localhost:5000/api/location/${locationId}/devices`, formDataToSend);
            refreshList();
            onClose();
        } catch (err) {
            setError(err.response.data.message);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-75">
            <div className="w-full max-w-md p-8 bg-white rounded-lg">
                <h2 className="mb-4 text-2xl font-bold">Add New Device</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="serialNumber" className="block font-bold text-gray-700">Serial Number</label>
                        <input type="text" id="serialNumber" name="serialNumber" value={formData.serialNumber} onChange={handleChange} className="px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="type" className="block font-bold text-gray-700">Type</label>
                        <select id="type" name="type" value={formData.type} onChange={handleChange} className="px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200">
                            <option value="">Select Type</option>
                            <option value="pos">POS</option>
                            <option value="kiosk">Kiosk</option>
                            <option value="signage">Signage</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="image" className="block font-bold text-gray-700">Image</label>
                        <input type="file" id="image" name="image" onChange={handleImageChange} className="px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="status" className="block font-bold text-gray-700">Status</label>
                        <select id="status" name="status" value={formData.status} onChange={handleChange} className="px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200">
                            <option value="">Select Status</option>
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                        </select>
                    </div>
                    {error && <p className="mb-4 text-red-500">{error}</p>}
                    <div className="flex justify-end">
                        <button type="button" onClick={onClose} className="px-4 py-2 mr-4 font-semibold text-gray-700 border border-gray-300 rounded-md focus:outline-none hover:bg-gray-100">Cancel</button>
                        <button type="submit" className="px-4 py-2 font-semibold text-white bg-indigo-600 rounded-md focus:outline-none hover:bg-indigo-700">Add Device</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddDevice;
