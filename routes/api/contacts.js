const express = require('express');

const { isValidId, validateBody } = require('../../middleware');
const {getContactsList} = require('../../controllers/contacts');
const { ctrlWrapper } = require('../../helpers');
const { schemas } = require('../../models/contact');


const router = express.Router();



// router.get('/',ctrlWrapper(getContactsList) );

// router.get('/:id', isValidId(req,_,next),ctrlWrapper(ctrl.getContactById));

// router.post('/',validateBody(schemas.contactInfo), ctrlWrapper(ctrl.createContact) );

// router.put('/:id',isValidId(req,_,next), validateBody(schemas.contactInfo), ctrlWrapper(ctrl.updateContact));

// router.delete('/:id', isValidId(req,_,next), ctrlWrapper(ctrl.removeContact));

// router.patch('/:id/favorite', isValidId(req, _, next), validateBody(schemas.favorite), ctrlWrapper(ctrl.updateStatusContact));

module.exports = router;
