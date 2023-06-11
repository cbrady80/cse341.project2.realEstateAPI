// When one of these specific routes is used, then we call the function in the controller/properties.js

// Import Express package Router
const express = require('express');
const router = express.Router();
// Import controller
const propertiesController = require('../controllers/properties');

// Import validation middleware - WEEK 6
const validation = require('../middleware/validate');

// Imports for Auth0 middleware - COULDNT GET THIS TO WORK
// const { requiresAuth } = require('/index');


//Route for retreiving all properties
router.get('/', propertiesController.getAllProperties);

//Route for retreiving one single property by id
router.get('/:id', propertiesController.getPropertyById);

//Route for creating a new property - POST
router.post('/', validation.saveProperty, propertiesController.newProperty);

//Route for updating an exsisting property - PUT
router.put('/:id', validation.saveProperty, propertiesController.updateProperty);

//Route for deleting a property - DELETE
router.delete('/:id', propertiesController.deleteProperty);

// // TEST route for use of Auth0 - POST - COULDNT GET THIS TO WORK
// router.post('/', requiresAuth(), (req, res) => {
//     console.log(req),
//     validation.saveProperty, 
//     propertiesController.newProperty;
// });



// Exports
module.exports = router;