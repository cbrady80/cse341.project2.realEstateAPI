// When one of these specific routes is used, then we call the function in the controller/properties.js

// Import Express package Router
const express = require('express');
const router = express.Router();
// Import controller
const propertiesController = require('../controllers/properties');

// Import validation middleware - WEEK 6
const validation = require('../middleware/validate');

// // Stuff for Auth0
// const { auth, requiresAuth } = require('express-openid-connect');
// const dotenv = require('dotenv');
// dotenv.config();

// const config = {
//   authRequired: false,
//   auth0Logout: true,
//   secret: process.env.SESSION_SECRET,
//   baseURL: process.env.BASE_URL,
//   clientID: process.env.AUTH0_CLIENT_ID,
//   issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL
// };

// // auth router attaches /login, /logout, and /callback routes to the baseURL
// router.use(auth(config));

// // req.isAuthenticated is provided from the auth router
// router.get('/checkLoginStatus', (req, res) => {
//   res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
// });

// // Example used to get profile info
// router.get('/profile', requiresAuth(), (req, res) => {
//   res.send(JSON.stringify(req.oidc.user));
// });

// // TEST route for use of Auth0 - POST
// router.post('/', requiresAuth(), (req, res) => {
//     validation.saveProperty, 
//     propertiesController.newProperty;
// });



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




// Exports
module.exports = router;