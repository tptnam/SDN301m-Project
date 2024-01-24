const updateUser = async (req, res) => {
    const { userId, newPassword } = req.body;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).send({ error: 'User not found' });
        }

        const isValidPassword = validatePassword(newPassword);
        if (!isValidPassword) {
            return res.status(400).send({
                error: 'Password must contain at least a lowercase, an uppercase letter, a number, and a special character',
            });
        }

        const hashedPassword = hashPassword(newPassword);

        user.password = hashedPassword; 
        user.updatedAt = Date.now();
        await user.save();

        return res.status(200).send({ message: 'User updated successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ error: 'An error occurred' });
    }
};

module.exports = { updateUser };
