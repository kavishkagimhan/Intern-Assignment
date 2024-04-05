import axios from 'axios';
import React, { useState } from 'react';

const AddLocation = () => {
    const [formData, setFormData] = useState({
        name: '',
        address: '',
        phone: ''
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        // Clear error message when user starts typing
        setErrors({ ...errors, [e.target.name]: '' });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation
        const errors = {};
        if (!formData.name.trim()) {
            errors.name = 'Name is required';
        }
        if (!formData.address.trim()) {
            errors.address = 'Address is required';
        }
        if (!formData.phone.trim()) {
            errors.phone = 'Phone is required';
        } else if (!/^\d{10}$/.test(formData.phone)) {
            errors.phone = 'Phone number must be 10 digits';
        }

        if (Object.keys(errors).length > 0) {
            setErrors(errors);
        } else {
            // Form submission logic
            try {
                const res = await axios.post('http://localhost:5000/api/location/', formData)
                console.log(res.message);
                setFormData({
                    name: '',
                    address: '',
                    phone: ''
                });
            }
            catch (error) {
                console.error(error);
            }
            
        }
    };

    return (
        <div className="max-w-md mx-auto mt-8 bg-gray-200 py-4 rounded-lg px-8">
            <h2 className="text-2xl font-semibold mb-4">Add Location</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="name" className="block text-gray-700">Name</label>
                    <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="w-full border rounded px-3 py-2 mt-1" />
                    {errors.name && <p className="text-red-500 mt-1">{errors.name}</p>}
                </div>
                <div>
                    <label htmlFor="address" className="block text-gray-700">Address</label>
                    <input type="text" id="address" name="address" value={formData.address} onChange={handleChange} className="w-full border rounded px-3 py-2 mt-1" />
                    {errors.address && <p className="text-red-500 mt-1">{errors.address}</p>}
                </div>
                <div>
                    <label htmlFor="phone" className="block text-gray-700">Phone</label>
                    <input type="text" id="phone" name="phone" value={formData.phone} onChange={handleChange} className="w-full border rounded px-3 py-2 mt-1" />
                    {errors.phone && <p className="text-red-500 mt-1">{errors.phone}</p>}
                </div>
                <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">Add Location</button>
            </form>
        </div>
    );
};

export default AddLocation;
