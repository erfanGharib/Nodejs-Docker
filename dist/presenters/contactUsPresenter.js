"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mailer_js_1 = require("../utils/mailer.js");
var contactUsModel_js_1 = require("../models/contactUsModel.js");
module.exports = {
    get: function (req, res) {
        res.render('contactUs', {
            title: 'ContactUs',
        });
    },
    sendMail: function (req, res) {
        var _a = contactUsModel_js_1.contactUsModel.validate(req.body), error = _a.error, value = _a.value;
        if (error)
            return res.status(400).send(error.message);
        (0, mailer_js_1.mailer)(value)
            .then(function () {
            res.send('Message Sent');
        })
            .catch(function () {
            res.status(500).send('Failed to Send Message');
        });
    }
};
//# sourceMappingURL=contactUsPresenter.js.map