const User = require('../database/Schemas/User');
const { refreshToken } = require('../utils/JWT-helpers');
const { verifyTokenController } = require('./authControllers');

const getUsers = async (req, res) => {
    const accessToken = await refreshToken(
        req.cookies.accessToken,
        req.cookies.refreshToken,
    );
    if (accessToken) {
        const users = await User.find(
            { role: { $ne: 'admin' } },
            {
                _id: 1,
                email: 1,
                role: 1,
                createdAt: 1,
                active: 1,
            },
        );
        if (users)
            res.render('admin/usersDashboard', {
                path: '/admin/users-dashboard',
                pageTitle: 'Users dashboard',
                users: users,
            });
        else res.status(404);
    } else res.status(401);
};

const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        if (user) res.status(200).send({ user: user });
        else res.status(404).send({ error: 'User not found' });
    } catch (error) {
        console.log(error);
    }
};

const updateUser = async (req, res) => {
    try {
        const { id, email, role, active } = req.body;

        if (active) {
            const updatedStatusUser = await User.findByIdAndUpdate(id, { active: value });

            if (updatedStatusUser) {
                res.status(200).send({ message: 'User status updated successfully' });
            } else {
                res.status(404).send({ error: 'User not found' });
            }
        } else {
            const updatedUserData = await User.findByIdAndUpdate(id, { email, role });

            if (updatedUserData) {
                res.status(200).send({ message: 'User data updated successfully' });
            } else {
                res.status(404).send({ error: 'User not found' });
            }
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: 'Internal Server Error' });
    }
};

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByIdAndUpdate(id, { active: false });
        if (user) res.redirect('/admin/users-dashboard');
        else res.status(404);
    } catch (error) {
        console.log(error);
    }
};

module.exports = { getUsers, getUserById, deleteUser, updateUser };
