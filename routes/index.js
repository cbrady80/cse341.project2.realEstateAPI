// Import Express package Router
const express = require('express');
const router = express.Router();

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