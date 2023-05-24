// This is where we make the call to MongoDB and return the data

const { response } = require('express');
const mongodb = require('../db/connection');
const ObjectId = require('mongodb').ObjectId;

// Function to retrieve all properties
const getAllProperties = async (req, res, next) => {
    mongodb
        .getDb()
        .db('realEstate')
        .collection('properties')
        .find()
        .toArray((err, lists) => {  //changed this to add in the error handling for week 6
            if (err) {
                res.status(400).json({ message: err });
            }
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(lists);
        });
};

// Function to retrive one property by ID
const getPropertyById = async (req, res, next) => {
    if (!ObjectId.isValid(req.params.id)) {  //changed this to add in the error handling for week 6
        res.status(400).json('Must use a valid id to find a property.');
    }
    const propertyId = new ObjectId(req.params.id);
    mongodb
        .getDb()
        .db('realEstate')
        .collection('properties')
        .find({_id: propertyId})
        .toArray((err, result) => {  //changed this to add in the error handling for week 6
            if (err) {
                res.status(400).json({ message: err });
            }
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(result[0]);
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
        .db('realEstate')
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
    if (!ObjectId.isValid(req.params.id)) {  //changed this to add in the error handling for week 6
        res.status(400).json('Must use a valid id to update a property.');
    }
    const propertyId = new ObjectId(req.params.id);

    const property = {
        propertyName: req.body.propertyName,
        address: req.body.address
    };

    const result = await mongodb
        .getDb()
        .db('realEstate')
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
    if (!ObjectId.isValid(req.params.id)) {  //changed this to add in the error handling for week 6
        res.status(400).json('Must use a valid contact id to delete a contact.');
    }
    const propertyId = new ObjectId(req.params.id);

    const result = await mongodb
        .getDb()
        .db('realEstate')
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