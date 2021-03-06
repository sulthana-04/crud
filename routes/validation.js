const Joi = require('@hapi/joi');

const registerValidation = data =>{
    const schema = {
        name: Joi.string()
        .required(),
        email: Joi.string()
        .min(6)
        .max(100)
        .required(),
        password: Joi.string()
        .min(6)
        .max(1024)
        .required()

    };
    return Joi.validate(data,schema);
}
const loginValidation = data =>{
    const schema = {
        email: Joi.string()
        .min(6)
        .max(100)
        .required()
        .email(),
        password: Joi.string()
        .min(6)
        .max(1024)
        .required()
    };
    return Joi.validate(data,schema);
}
module.exports.loginValidation=loginValidation;
module.exports.registerValidation=registerValidation;