// This is where we make the call to MongoDB and return the data

const { response } = require('express');
const mongodb = require('../db/connection');
const ObjectId = require('mongodb').ObjectId;

// Function to retrieve all tenants
const getAllTenants = async (req, res, next) => {
    const result = await mongodb
        .getDb()
        .db('realEstate')
        .collection('tenants')
        .find();
    result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists);
    });
};

// Function to retrive one tenant by ID
const getTenantById = async (req, res, next) => {
    const tenantId = new ObjectId(req.params.id);
    const result = await mongodb
        .getDb()
        .db('realEstate')
        .collection('tenants')
        .find({_id: tenantId});
    result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists[0]);
    });
};

// Function to create a NEW tenant
const newTenant = async (req, res, next) => {
    const tenant = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        propertyAddr: req.body.propertyAddr,
        monthlyRent: req.body.monthlyRent,
        leaseStart: req.body.leaseStart,
        leaseEnd: req.body.leaseEnd
    };

    const result = await mongodb
        .getDb()
        .db('realEstate')
        .collection('tenants')
        .insertOne(tenant);
    
    if (result.acknowledged) {
        res.status(201).json(result);
    } else {
        res.status(500).json(result.error || 'An error occurred.  Tenant not created.');
    };
};

// Function to UPDATE an exsisting tenant
const updateTenant = async (req, res, next) => {
    const tenantId = new ObjectId(req.params.id);

    const tenant = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        propertyAddr: req.body.propertyAddr,
        monthlyRent: req.body.monthlyRent,
        leaseStart: req.body.leaseStart,
        leaseEnd: req.body.leaseEnd
    };

    const result = await mongodb
        .getDb()
        .db('realEstate')
        .collection('tenants')
        .updateOne(
            {_id: tenantId},
            {$set: tenant}
        );

    console.log(result);
    if (result.acknowledged) {
        res.status(204).send();
    } else {
        res.status(500).json(result.error || 'An error occurred.  Tenant not updated.');
    };
};

// Function to DELETE an existing tenant
const deleteTenant = async (req, res, next) => {
    const tenantId = new ObjectId(req.params.id);

    const result = await mongodb
        .getDb()
        .db('realEstate')
        .collection('tenants')
        .deleteOne({_id: tenantId});

    console.log(result);
    if (result.deletedCount > 0) {
        res.status(200).send();
    } else {
        res.status(500).json(result.error || 'An error occurred.  Tenant not deleted.');
    };
};


module.exports = {
    getAllTenants,
    getTenantById,
    newTenant,
    updateTenant,
    deleteTenant
};