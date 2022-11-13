const { object } = require('joi');
const Joi = require('joi');

const { Schema, model } = require('mongoose');

const emailRegExp = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;
const phoneRegExp = /^((\+?3)?8)?((0\(\d{2}\)?)|(\(0\d{2}\))|(0\d{2}))\d{7}$/;
const nameRegExp = /(^[A-Z]{1}[a-z]{1,14} [A-Z]{1}[a-z]{1,14}$)|(^[А-Я]{1}[а-я]{1,14} [А-Я]{1}[а-я]{1,14}$)/;

const contactScheme = new Schema({
    name: {
        type: String,
        required: [true, 'Set name for contact'],
        match: nameRegExp,
    },
    email: {
        type: String,
        match:emailRegExp,
    },
    phone: {
        type: String,
      
    },
    favorite: {
        type: Boolean,
        default: false,
    },
},
    {
        timestamps: true,
        versionKey:false,
    }
);

const contactsScheme = Joi.object({
  name: Joi.string().required().pattern(nameRegExp),
  email: Joi.string().required().pattern(emailRegExp),
  phone: Joi.number().required()
});

const statusScheme = Joi.object({
    favorite: Joi.boolean().required(),
});

const Contact = model("contact", contactScheme);

const schemas = {
    contactInfo: contactsScheme,
    favorite:statusScheme,
}

module.exports = {
    Contact,
schemas
}




