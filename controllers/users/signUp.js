const { User } = require('../../models/user');
const bcrypt = require('bcryptjs');
const { createError } = require('../../helpers');

const signUp = async (req,res,next) => {
    const { email, password, subscription } = req.body;
    const user = await User.findOne({ email });
    if (user) {
        next(createError(409, 'Email is already in use'));
    };
    const hash = bcrypt.hash(password, 10);
    const newUser = User.create({
        email,
        password: hash,
        subscription,
    });
    res.status(200).json(newUser);
}

module.exports = signUp;