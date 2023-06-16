import Joi = require("joi");

export const authSchema = Joi.object({
    password: Joi
        .string()
        .min(8)
        .required(),
    email: Joi
        .string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        .required(),
})