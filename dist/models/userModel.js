"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userModel = void 0;
var Joi = require("joi");
exports.userModel = Joi.object({
    password: Joi
        .string()
        .min(8)
        .required(),
    email: Joi
        .string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        .required(),
});
//# sourceMappingURL=userModel.js.map