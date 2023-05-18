// When one of these specific routes is used, then we call the function in the controller/properties.js

// Import Express package Router
const express = require('express');
const router = express.Router();
// Import controller
const propertiesController = require('../controllers/properties');

//Route for retreiving all properties
router.get('/', propertiesController.getAllProperties);

//Route for retreiving one single property by id
router.get('/:id', propertiesController.getPropertyById);

//Route for creating a new property - POST
router.post('/', propertiesController.newProperty);

//Route for updating an exsisting property - PUT
router.put('/:id', propertiesController.updateProperty);

//Route for deleting a property - DELETE
router.delete('/:id', propertiesController.deleteProperty);


// Exports
module.exports = router;