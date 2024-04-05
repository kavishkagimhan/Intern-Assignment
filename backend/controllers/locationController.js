const Location = require('../models/Location');
const Device = require('../models/Device');


// Controller function to create a new location
exports.createLocation = async (req, res) => {
    try {
        const location = await Location.create(req.body);
        res.status(201).json(location);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Controller function to get all locations
exports.getAllLocations = async (req, res) => {
    try {
        const locations = await Location.find();
        res.json(locations);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Controller function to get a specific location by ID
exports.getLocationById = async (req, res) => {
    try {
        const location = await Location.findById(req.params.id).populate('devices');
        if (!location) {
            return res.status(404).json({ message: 'Location not found' });
        }
        res.json(location);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Controller function to add a device to a location
exports.addDeviceToLocation = async (req, res) => {
    try {
        const location = await Location.findById(req.params.id);
        if (!location) {
            return res.status(404).json({ message: 'Location not found' });
        }

        const device = new Device(req.body);
        await device.save();

        location.devices.push(device);
        await location.save();

        res.status(201).json(location);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Controller function to remove a device from a location
exports.removeDeviceFromLocation = async (req, res) => {
    try {
        const location = await Location.findById(req.params.locationId);
        if (!location) {
            return res.status(404).json({ message: 'Location not found' });
        }
        location.devices = location.devices.filter(deviceId => deviceId.toString() !== req.params.deviceId);
        await location.save();
        res.json(location);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};