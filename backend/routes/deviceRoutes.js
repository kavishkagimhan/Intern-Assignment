// routes/deviceRoutes.js
const express = require('express');
const router = express.Router();
const deviceController = require('../controllers/deviceController');

router.get('/', deviceController.getAllDevices);
router.post('/', deviceController.createDevice);

router.get('/:id', deviceController.getDeviceById, (req, res) => {
    res.json(res.device);
});
router.patch('/:id', deviceController.getDeviceById, deviceController.updateDevice);
router.delete('/:id', deviceController.getDeviceById, deviceController.deleteDevice);

module.exports = router;
