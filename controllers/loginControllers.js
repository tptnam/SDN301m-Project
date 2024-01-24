const User = require('../database/Schemas/User');
const bcrypt = require('bcryptjs');

const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.sendStatus(400);
    }
    try {
        const userDB = await User.findOne({ email });
        if (!userDB)
            return res.status(401).send({ error: 'Incorrect email or password' });
        const isValid = comparePassword(password, userDB.password);
        if (isValid) {
            return res.sendStatus(200);
        } else
            return res.status(401).send({ error: 'Incorrect email or password' });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ error: 'An error occurred' });
    }
};

const comparePassword = (inputPassword, hashedPassword) => {
    return bcrypt.compareSync(inputPassword, hashedPassword);
};

module.exports = { login };
