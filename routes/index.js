const { auth } = require('express-openid-connect');
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

// Import Express package Router
const express = require('express');
const router = express.Router();

// auth router attaches /login, /logout, and /callback routes to the baseURL
router.use(auth(config));

// req.isAuthenticated is provided from the auth router
router.get('/checkLoginStatus', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});


// USE request for swagger
router.use('/', require('./swagger'));
// USE request for PROPERTIES
router.use('/properties', require('./properties'));
//USE request for TENANTS
router.use('/tenants', require('./tenants'));
router.use(
    '/',
    (docData = (req, res) => {
      let docData = {
        documentationURL: 'https://github.com/cbrady80/cse341.project2.realEstateAPI',
      };
      res.send(docData);
    })
  );

// Export
module.exports = router;