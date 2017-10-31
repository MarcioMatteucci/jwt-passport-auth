const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config/database');

const app = express();

// Mongoose
mongoose.connect(config.localUri, { useMongoClient: true });
mongoose.Promise = global.Promise;

// On Connection
mongoose.connection.on('connected', () => {
   console.log('Connected to database: ' + config.localUri);
});

// On Error
mongoose.connection.on('error', (err) => {
   console.log('Database error: ' + err);
});

// Middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());

// Routes
app.use('/api/users', require('./routes/users'));

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
   console.log(`Server listening at ${port}`);
});