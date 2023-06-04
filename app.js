// Import the dependencies
const express = require('express');
const bodyParser = require('body-parser'); // helps us decode the body from an HTTP request
const mongodb = require('./db/connection');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

// Instantiate an express object
const app = express();

// Save a port number
const port = process.env.PORT;


app
    .use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
    .use(bodyParser.json())
    .use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader(
            'Access-Control-Allow-Headers', 
            'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
        );
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        next();
    })
    .use('/', require('./routes')); // Calls the routes to view the data

// ADDING FOR WEEK 6 - DATA VALIDATION AND ERROR HANDLING
process.on('uncaughtException', (err, origin) => {
    console.log(process.stderr.fd, `Caught exception: ${err}\n` + `Exception origin: ${origin}`);
});

mongodb.initDb((err, mongodb) => {
    if (err) {
        console.log(err);
    } else {
        // Event Listener
        app.listen(port);
        // Log message
        console.log(`Connected to DB and listening at port ${port}`);
    }
});