const { User } = require('../../models/user');
const bcrypt = require('bcryptjs');
const { createError } = require('../../helpers');

const signUp = async (req,res,next) => {
    const { email, password, subscription='starter' } = req.body;
    const user = await User.findOne({ email });
    if (user) {
        throw createError(409, 'Email is already in use');
    };
    const hash = await bcrypt.hash(password, 10);
    const newUser = User.create({
        email,
        password: hash,
        subscription,
    });
    res.status(200).json(email);
}

module.exports = signUp;