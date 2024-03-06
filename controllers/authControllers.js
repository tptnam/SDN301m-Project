const User = require('../database/Schemas/User');
const jwt = require('jsonwebtoken');
const {
    signToken,
    renewAccessToken,
    refreshToken,
    decodeToken,
} = require('../utils/JWT-helpers');

const {
    validatePassword,
    comparePassword,
    validateEmail,
} = require('../utils/helpers');
const Token = require('../database/Schemas/Token');

const { RefreshTokenExpired, InvalidTokenError } = require('../errors/errors');

const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.sendStatus(400);
    }
    try {
        const userDB = await User.findOne({ email });
        if (!userDB)
            return res
                .status(401)
                .send({ error: 'Incorrect email or password' });
        const isValid = comparePassword(password, userDB.password);
        if (isValid) {
            var accessToken = (await signToken(userDB.id)).accessToken;
            var refreshToken = (await signToken(userDB.id)).refreshToken;

            await res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                sameSite: 'None',
                secure: true,
                maxAge: 24 * 60 * 60 * 10000,
            });
            await res.cookie('accessToken', accessToken, {
                httpOnly: true,
                sameSite: 'None',
                secure: true,
            });
            if (userDB.role === 'admin') {
                return res.redirect('/admin/users-dashboard');
            } else return res.redirect('/');
        } else
            return res
                .status(401)
                .send({ error: 'Incorrect email or password' });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ error: 'An error occurred' });
    }
};

const registerAccount = async (req, res) => {
    try {
        const email = validateEmail(req.body.email);
        if (email) {
            const userDB = await User.findOne({
                email: req.body.email.trim(),
            });
            if (userDB) {
                res.send({ error: 'User existed' });
            } else {
                const password = validatePassword(req.body.password);
                if (password) {
                    const newUser = await User.create({
                        password: password,
                        email: req.body.email,
                    });
                    newUser.save();
                    res.status(201).send({ message: 'User created!' });
                } else
                    res.status(400).send({
                        error: 'Password must contain at least a lowercase, an uppercase letter, a number and a special character',
                    });
            }
        } else res.status(400).send({ error: 'Invalid email format!' });
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: 'An error occurred' });
    }
};

const compareOldPassword = async (req, res) => {
    const { email, password } = req.body;
    try {
        const userDB = await User.findOne({ email: email });
        if (userDB) {
            const oldPassword = comparePassword(password, userDB.password);
            if (oldPassword) {
                res.redirect(200, 'http://localhost:3000/change-password');
            } else {
                res.status(400).send({ error: 'Wrong old password!' });
            }
        } else res.status(400);
    } catch (error) {
        console.log(error);
    }
};

const changePassword = async (req, res) => {
    const { email, newPassword } = req.body;
    try {
        const userDB = await User.findOne({ email: email });
        if (userDB) {
            const oldPassword = comparePassword(newPassword, userDB.password);
            if (oldPassword) {
                res.status(400).send({
                    error: 'New password can not be similar to old password',
                });
            } else {
                const newPassword = validatePassword(req.body.newPassword);
                if (newPassword) {
                    await User.updateOne(
                        { email: email },
                        { password: newPassword, updatedAt: Date.now() },
                    );
                    res.send({ message: 'Password changed!' });
                } else {
                    res.status(400).send({
                        error: 'Password must contain at least a lowercase, an uppercase letter, a number and a special character',
                    });
                }
            }
        } else {
            res.send({ error: 'Email not found' });
        }
    } catch (e) {
        console.log(e);
        res.status(500).send({ error: 'An error occured' });
    }
};

const verifyTokenController = async (req, res) => {
    try {
        if (req.cookies.accessToken && req.cookies.refreshToken) {
            const accessToken = await refreshToken(
                req.cookies.accessToken,

                req.cookies.refreshToken,
            );
            res.status(200)
                .setHeader('Authorization', 'Bearer ' + accessToken)
                .send();
        }
    } catch (error) {
        console.log(error);
        if (error instanceof RefreshTokenExpired) {
            res.status(401).json({ error: 'Please sign in again' });
        } else if (error instanceof InvalidTokenError) {
            res.status(401);
        } else {
            res.status(500).json({ error: 'An error occurred' });
        }
    }
};

module.exports = {
    changePassword,
    registerAccount,
    login,
    compareOldPassword,
    verifyTokenController,
};
