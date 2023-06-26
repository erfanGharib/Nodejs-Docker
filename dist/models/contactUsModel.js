"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contactUsModel = void 0;
var Joi = require("joi");
exports.contactUsModel = Joi.object({
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
});
//# sourceMappingURL=contactUsModel.js.map