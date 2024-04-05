// routes/locationRoutes.js
const express = require('express');
const router = express.Router();
const locationController = require('../controllers/locationController');

router.get('/', locationController.getAllLocations);
router.post('/', locationController.createLocation);

router.get('/:id', locationController.getLocationById, (req, res) => {
    res.json(res.location);
});
router.patch('/:id', locationController.getLocationById, locationController.updateLocation);
router.delete('/:id', locationController.getLocationById, locationController.deleteLocation);

module.exports = router;
