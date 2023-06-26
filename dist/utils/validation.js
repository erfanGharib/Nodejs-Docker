var validateEmail = function (email) {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.toLowerCase().trim());
};
var validatePassword = function (password) {
    return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(password.trim());
};
var validateUsername = function (username) {
    return /^[a-zA-Z]{6,}/.test(username);
};
module.exports = {
    validateEmail: validateEmail,
    validatePassword: validatePassword,
    validateUsername: validateUsername
};
//# sourceMappingURL=validation.js.map