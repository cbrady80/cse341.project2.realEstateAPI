// WEEK 6 VALIDATION

const validator = require('../helpers/validate');

const saveProperty = (req, res, next) => {
    const validationRule = {
        propertyName: 'required|string',
        address: 'required|string'
    };
    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412).send({
                success: false,
                message: 'Validation failed',
                data: err
            });
        } else {
            next();
        }
    });
};

const saveTenant = (req, res, next) => {
    const validationRule = {
        firstName: 'required|string',
        lastName: 'required|string',
        email: 'required|email',
        propertyAddr: 'required|string',
        monthlyRent: 'required|string',
        leaseStart: 'required|string',
        leaseEnd: 'required|string'
    };
    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412).send({
                success: false,
                message: 'Validation failed',
                data: err
            });
        } else {
            next();
        }
    });
};

module.exports = {
    saveProperty,
    saveTenant
};