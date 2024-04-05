const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const dbConnect = require('./config/dbConnection');
const dotenv = require('dotenv');


const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

//dotenv conig
dotenv.config();

// MongoDB Connection
dbConnect();


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));