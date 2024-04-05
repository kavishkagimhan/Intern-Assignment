// controllers/locationController.js
const Location = require('../models/location');

// Controller functions
const getAllLocations = async (req, res) => {
    try {
        const locations = await Location.find().populate('devices');
        res.json(locations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createLocation = async (req, res) => {
    const location = new Location(req.body);
    try {
        const newLocation = await location.save();
        res.status(201).json(newLocation);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getLocationById = async (req, res, next) => {
    let location;
    try {
        location = await Location.findById(req.params.id).populate('devices');
        if (location == null) {
            return res.status(404).json({ message: 'Location not found' });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }

    res.location = location;
    next();
};

const updateLocation = async (req, res) => {
    if (req.body.name != null) {
        res.location.name = req.body.name;
    }
    if (req.body.address != null) {
        res.location.address = req.body.address;
    }
    if (req.body.phone != null) {
        res.location.phone = req.body.phone;
    }
    try {
        const updatedLocation = await res.location.save();
        res.json(updatedLocation);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteLocation = async (req, res) => {
    try {
        await res.location.remove();
        res.json({ message: 'Location deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllLocations,
    createLocation,
    getLocationById,
    updateLocation,
    deleteLocation
};
