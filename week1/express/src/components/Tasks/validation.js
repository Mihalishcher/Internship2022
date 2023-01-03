const Joi = require('joi');

const schemas = {
    createTask: Joi.object().keys({
        title: Joi.string().min(2).max(60).required(),
        description: Joi.string().min(2).max(360).required(),
        estimatedTime: Joi.number().required(),
        createdBy: Joi.string().min(2).max(40).required(),
    }),
    updateTask: Joi.object().keys({
        estimatedTime: Joi.number().required(),
    }),
    checkID: Joi.object().keys({
        id: Joi.string().alphanum(),
    }),
};

module.exports = schemas;
