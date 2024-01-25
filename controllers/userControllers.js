const User = require('../database/Schemas/User');

const getUsers = async (req, res) => {
    try {
        const users = await User.find(
            {},
            {
                email: 1,
                createdAt: 1,
                active: 1,
            },
        );
        if (users) res.status(200).send({ users: users });
        else res.status(404).send({ error: 'No users found!' });
    } catch (e) {
        console.log(e);
    }
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

const deleteUser = async (req, res) => {
    try {
        const { id } = req.body;
        const user = await User.findByIdAndUpdate(id, { active: false });
        if (user) res.status(200).send({ message: 'User deactivated!' });
        else res.status(404).send({ error: 'User not found!' });
    } catch (error) {
        console.log(error);
    }
};

module.exports = { getUsers, getUserById, deleteUser };
