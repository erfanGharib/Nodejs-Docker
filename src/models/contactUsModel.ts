import Joi = require("joi");

export const contactUsModel = Joi.object({
    message: Joi
        .string()
        .required(),
    fullName: Joi
        .string()
        .required(),
    email: Joi
        .string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        .required(),
})