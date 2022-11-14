const Joi = require('joi');
const { Schema, model } = require('mongoose');

const emailRegExp = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;

const userScheme = new Schema({
    password: {
        type: String,
        required: [true, 'Set password for user'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
    },
    subscription: {
        type: String,
        enum: ["starter", "pro", "business"],
        default: "starter"
    },
    token: String
});

const User = model('user', userScheme);

const registerScheme = Joi.object({
    email: Joi.string().required().pattern(emailRegExp),
    password: Joi.string().required().min(6),
    subscription: Joi.string().valid('starter', 'business', 'pro').default('starter'),
});

const loginScheme = Joi.object({
    email: Joi.string().required().pattern(emailRegExp),
    password: Joi.string().required().min(6),

});

const subscriptionScheme = Joi.object({
    subscription: Joi.string().required().valid('starter', 'business', 'pro'),
});

const schemas = {
    register: registerScheme,
    login: loginScheme,
    subscription: subscriptionScheme,
};

module.exports = {
    User,
schemas,
}