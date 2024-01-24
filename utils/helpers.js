const bcrypt = require('bcryptjs');
const validatePassword = (password) => {
    const regex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&*()+\-=\[\]{};':\\,.<>/?]).{8,}$/;
    const validPassword = regex.test(password);
    if (validPassword) {
        return hashPassword(password);
    } else return null;
};

const hashPassword = (password) => {
    const salt = bcrypt.genSaltSync();
    return bcrypt.hashSync(password, salt);
};

const comparePassword = (inputPassword, hashedPassword) => {
    return bcrypt.compareSync(inputPassword, hashedPassword);
};

module.exports = {validatePassword, hashPassword, comparePassword };
