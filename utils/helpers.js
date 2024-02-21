const bcrypt = require('bcryptjs');
const validatePassword = (password) => {
    const regex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&*()+\-=\[\]{};':\\,.<>/?]).{8,}$/;
    const validPassword = regex.test(password);
    if (validPassword) {
        return hashPassword(password);
    } else return null;
};

const validateEmail = (email) => {
    const emailRegex =
        /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
    const validEmail = emailRegex.test(email);
    if (validEmail) return true;
    else return false;
};

const hashPassword = (password) => {
    const salt = bcrypt.genSaltSync();
    return bcrypt.hashSync(password, salt);
};

const comparePassword = (inputPassword, hashedPassword) => {
    return bcrypt.compareSync(inputPassword, hashedPassword);
};

module.exports = {
    validatePassword,
    hashPassword,
    comparePassword,
    validateEmail,
};
