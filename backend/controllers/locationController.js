const Location = require('../models/Location');
const Device = require('../models/Device');
const multer = require('multer');
const path = require('path');


// Set up multer storage for image uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/images'); 
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname));
    }
  });

  const upload = multer({ storage: storage });




// Controller function to create a new location
exports.createLocation = async (req, res) => {
    try {
        const location = await Location.create(req.body);
        res.status(201).json({ message: "Location Added Success", location });
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

// Controller function to delete a location
exports.deleteLocation = async (req, res) => {
    try {
        const location = await Location.findByIdAndDelete(req.params.id);
        if (!location) {
            return res.status(404).json({ message: 'Location not found' });
        }
        res.json({ message: 'Location deleted successfully' });
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

// Controller function to add a device to a location with image upload
exports.addDeviceToLocation = async (req, res) => {
    try {
        const location = await Location.findById(req.params.id);
        if (!location) {
            return res.status(404).json({ message: 'Location not found' });
        }

        // Multer middleware for handling image uploads
        upload.single('image')(req, res, async function (err) {
            if (err instanceof multer.MulterError) {
                return res.status(400).json({ message: err.message });
            } else if (err) {
                return res.status(500).json({ message: err.message });
            }

            try {
                // File uploaded successfully
                const deviceData = {
                    serialNumber: req.body.serialNumber,
                    type: req.body.type,
                    // Assuming the field name for the image is 'image'
                    image: req.file ? req.file.path : null, // Save image URL or null if no file uploaded
                    status: req.body.status
                };

                const device = new Device(deviceData);
                await device.save();

                location.devices.push(device);
                await location.save();

                res.status(201).json(location);
            } catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
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