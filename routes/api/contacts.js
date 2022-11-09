const express = require('express');
const Joi = require('joi');

const { listContacts, getContactById, addContact, removeContact, updateContact } = require('../../models/contacts');
const { createError } = require('../../helpers');

const router = express.Router();

const contactsScheme = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.number().required()
});



router.get('/', async (req, res, next) => {
  try {
    const contacts = await listContacts();
    res.status(200).json(contacts);
  } catch (error) {
   next (error)
  }
});

router.get('/:contactId', async (req, res, next) => {
try {
  const contactId = req.params.contactId;
  const contact = await getContactById(contactId);
  if (!contact){
    throw createError(404, 'Not Found');
  }
  res.status(200).json(contact);
} catch (error) {
  next(error)
}
});

router.post('/', async (req, res, next) => {
 try {
   const {error} = contactsScheme.validate(req.body);
if(error){
  throw createError(400, error.message);
}
   const contact = await addContact(req.body);
   res.status(201).json(contact);
 } catch (error) {
   next(error);
 }
});

router.delete('/:contactId', async (req, res, next) => {
  try {
    const contactId = req.params.contactId;
    const deleteContact = await removeContact(contactId);
  if (!deleteContact) {
    throw createError(404, 'Not found');
  }
    res.status(200).json({ message: 'contact deleted' });
  } catch (error) {
    next(error);
  }
});

router.put('/:contactId', async (req, res, next) => {
try {
  const contactId = req.params.contactId;
  const { error } = contactsScheme.validate(req.body);
  console.log(error);
  if (error) {
    throw createError(400, error.message);
  }
  const contacts = await updateContact(contactId, req.body);
  if (!contacts) {
    throw createError(404, 'Not found');
  };
  res.status(200).json(contacts);
} catch (error) {
  next(error)
}
});

module.exports = router
