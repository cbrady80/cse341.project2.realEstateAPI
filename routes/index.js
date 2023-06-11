// Import Express package Router
const express = require('express');
const router = express.Router();

// Imports for Auth0
const { auth, requiresAuth } = require('express-openid-connect');
const dotenv = require('dotenv');
dotenv.config();

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.SESSION_SECRET,
  baseURL: process.env.BASE_URL,
  clientID: process.env.AUTH0_CLIENT_ID,
  issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL
};

// auth0 router attaches /login, /logout, and /callback routes to the baseURL
router.use(auth(config));

// req.isAuthenticated is provided from the auth router
router.get('/checkLoginStatus', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});

// Example used to get profile info
router.get('/profile', requiresAuth(), (req, res) => {
  console.log('in /profile');
  res.send(JSON.stringify(req.oidc.user));
});


// USE request for swagger
router.use('/', require('./swagger'));

// USE request for PROPERTIES
router.use('/properties', require('./properties'));

//USE request for TENANTS
router.use('/tenants', require('./tenants'));

// USE request for HOME page
router.use(
  '/',
  (docData = (req, res) => {
    let docData = {
      title: 'HOME PAGE',
      documentationURL: 'https://github.com/cbrady80/cse341.project2.realEstateAPI'
    };
    res.send(docData);
  })
);



// Export
module.exports = router;