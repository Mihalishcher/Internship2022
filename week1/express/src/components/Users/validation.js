const Joi = require('joi');

const schemas = {
    createUser: Joi.object().keys({
        firstName: Joi.string().min(2).max(32).required(),
        lastName: Joi.string().min(2).max(32).required(),
        email: Joi.string().email().required(),
        password: Joi.string().alphanum().min(8).required(),
    }),
    updateUser: Joi.object().keys({
        firstName: Joi.string().min(3).max(32),
        lastName: Joi.string().min(3).max(32),
        email: Joi.string().email(),
        password: Joi.string().alphanum().min(8),
    }),
    checkID: Joi.object().keys({
        id: Joi.string().alphanum(),
    }),
    signIn: Joi.object().keys({
        email: Joi.string().email().required(),
        password: Joi.string().alphanum().min(8).required(),
    }),
};

module.exports = schemas;
