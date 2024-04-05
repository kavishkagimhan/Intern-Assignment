// routes/location.js
const express = require('express');
const router = express.Router();
const locationController = require('../controllers/locationController');

router.post('/', locationController.createLocation);
router.get('/', locationController.getAllLocations);
router.get('/:id', locationController.getLocationById);
router.post('/:id/devices', locationController.addDeviceToLocation);
router.delete('/:locationId/devices/:deviceId', locationController.removeDeviceFromLocation);

module.exports = router;
