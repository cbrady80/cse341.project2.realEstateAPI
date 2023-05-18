// This is where we make the call to MongoDB and return the data

const { response } = require('express');
const mongodb = require('../db/connection');
const ObjectId = require('mongodb').ObjectId;

// Function to retrieve all properties
const getAllProperties = async (req, res, next) => {
    const result = await mongodb
        .getDb()
        .db()
        .collection('properties')
        .find();
    result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists);
    });
};

// Function to retrive one property by ID
const getPropertyById = async (req, res, next) => {
    const propertyId = new ObjectId(req.params.id);
    const result = await mongodb
        .getDb()
        .db()
        .collection('properties')
        .find({_id: propertyId});
    result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists[0]);
    });
};

// Function to create a NEW property
const newProperty = async (req, res, next) => {
    const property = {
        propertyName: req.body.propertyName,
        address: req.body.address
    };

    const result = await mongodb
        .getDb()
        .db()
        .collection('properties')
        .insertOne(property);
    
    if (result.acknowledged) {
        res.status(201).json(result);
    } else {
        res.status(500).json(result.error || 'An error occurred.  Property not created.');
    };
};

// Function to UPDATE an exsisting property
const updateProperty = async (req, res, next) => {
    const propertyId = new ObjectId(req.params.id);

    const property = {
        propertyName: req.body.propertyName,
        address: req.body.address
    };

    const result = await mongodb
        .getDb()
        .db()
        .collection('properties')
        .updateOne(
            {_id: propertyId},
            {$set: property}
        );

    console.log(result);
    if (result.acknowledged) {
        res.status(204).send();
    } else {
        res.status(500).json(result.error || 'An error occurred.  Property not updated.');
    };
};

// Function to DELETE an existing property
const deleteProperty = async (req, res, next) => {
    const propertyId = new ObjectId(req.params.id);

    const result = await mongodb
        .getDb()
        .db()
        .collection('properties')
        .deleteOne({_id: propertyId});

    console.log(result);
    if (result.deletedCount > 0) {
        res.status(200).send();
    } else {
        res.status(500).json(result.error || 'An error occurred.  Property not deleted.');
    };
};


module.exports = {
    getAllProperties,
    getPropertyById,
    newProperty,
    updateProperty,
    deleteProperty
};