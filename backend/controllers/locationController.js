const Location = require('../models/Location');

// Controller function to get all locations
const getAllLocations = async (req, res) => {
  try {
    const locations = await Location.find().populate('devices');
    res.json(locations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Controller function to get a single location by ID
const getLocationById = async (req, res) => {
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

// Controller function to create a new location
const createLocation = async (req, res) => {
  const { name, address, phone } = req.body;

  try {
    const location = new Location({ name, address, phone });
    const newLocation = await location.save();
    res.status(201).json(newLocation);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Controller function to update a location by ID
const updateLocationById = async (req, res) => {
  try {
    const location = await Location.findById(req.params.id);
    if (!location) {
      return res.status(404).json({ message: 'Location not found' });
    }

    // Update location details
    for (const key in req.body) {
      if (req.body[key] != null) {
        location[key] = req.body[key];
      }
    }

    const updatedLocation = await location.save();
    res.json(updatedLocation);
  } catch (err) {
    res.status(400).json({ message: 'Location update unsuccessful', error: err.message });
  }
};

// Controller function to delete a location by ID
const deleteLocationById = async (req, res) => {
  try {
    const location = await Location.findById(req.params.id);
    if (!location) {
      return res.status(404).json({ message: 'Location not found' });
    }
    await location.deleteOne();
    res.json({ message: 'Location deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllLocations,
  getLocationById,
  createLocation,
  updateLocationById,
  deleteLocationById
};
