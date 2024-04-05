// controllers/deviceController.js
const Device = require('../models/device');

// Controller functions
const getAllDevices = async (req, res) => {
    try {
        const devices = await Device.find();
        res.json(devices);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createDevice = async (req, res) => {
    const device = new Device(req.body);
    try {
        const newDevice = await device.save();
        res.status(201).json(newDevice);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getDeviceById = async (req, res) => {
    res.json(res.device);
};

const updateDevice = async (req, res) => {
    if (req.body.serialNumber != null) {
        res.device.serialNumber = req.body.serialNumber;
    }
    if (req.body.type != null) {
        res.device.type = req.body.type;
    }
    if (req.body.image != null) {
        res.device.image = req.body.image;
    }
    if (req.body.status != null) {
        res.device.status = req.body.status;
    }
    try {
        const updatedDevice = await res.device.save();
        res.json(updatedDevice);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteDevice = async (req, res) => {
    try {
        await res.device.remove();
        res.json({ message: 'Device deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllDevices,
    createDevice,
    getDeviceById,
    updateDevice,
    deleteDevice
};
