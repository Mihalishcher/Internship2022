const Joi = require('joi');

const schemas = {
    createUser: Joi.object().keys({
        firstname: Joi.string().min(2).max(32).required(),
        lastname: Joi.string().min(2).max(32).required(),
        email: Joi.string().email().required(),
        birthYear: Joi.number().min(1930).max(new Date().getFullYear()).required(),
        password: Joi.string().alphanum().min(8).required(),
    }),
    updateUser: Joi.object().keys({
        firstname: Joi.string().min(3).max(32),
        lastname: Joi.string().min(3).max(32),
        email: Joi.string().email(),
        birthYear: Joi.number().min(1970).max(2022),
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
