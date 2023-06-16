const validateEmail = (email) => {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.toLowerCase().trim());
}
const validatePassword = (password) => {
    return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(password.trim());
}
const validateUsername = (username) => {
    return /^[a-zA-Z]{6,}/.test(username);
}

module.exports = {
    validateEmail,
    validatePassword,
    validateUsername
}