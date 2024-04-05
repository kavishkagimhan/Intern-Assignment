// routes/locationRoutes.js
const express = require('express');
const router = express.Router();
const locationController = require('../controllers/locationController');

// Get all locations
router.get('/', locationController.getAllLocations);

// Get single location by ID
router.get('/:id', locationController.getLocationById);

// Create a new location
router.post('/add', locationController.createLocation);

// Update a location by ID
router.put('/update/:id', locationController.updateLocationById);

// Delete a location by ID
router.delete('/delete/:id', locationController.deleteLocationById);

module.exports = router;
