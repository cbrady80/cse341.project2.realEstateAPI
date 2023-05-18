// When one of these specific routes is used, then we call the function in the controller/tenants.js

// Import Express package Router
const express = require('express');
const router = express.Router();
// Import controller
const tenantsController = require('../controllers/tenants');

//Route for retreiving all tenants
router.get('/', tenantsController.getAllTenants);

//Route for retreiving one single tenant by id
router.get('/:id', tenantsController.getTenantById);

//Route for creating a new tenant - POST
router.post('/', tenantsController.newTenant);

//Route for updating an exsisting tenant - PUT
router.put('/:id', tenantsController.updateTenant);

//Route for deleting a tenant - DELETE
router.delete('/:id', tenantsController.deleteTenant);


// Exports
module.exports = router;