const express = require('express');

const { isValidId, validateBody } = require('../../middleware');
const ctrl= require('../../controllers/contacts');
const { ctrlWrapper } = require('../../helpers');
const { schemas } = require('../../models/contact');


const router = express.Router();



router.get('/', ctrlWrapper(ctrl.getContactsList) );

router.get('/:id', isValidId, ctrlWrapper(ctrl.getContactById));

router.post('/',validateBody(schemas.contactInfo), ctrlWrapper(ctrl.createContact) );

router.put('/:id',isValidId, validateBody(schemas.contactInfo), ctrlWrapper(ctrl.updateContact));

router.delete('/:id', isValidId, ctrlWrapper(ctrl.removeContact));

router.patch('/:id/favorite', isValidId, validateBody(schemas.favorite), ctrlWrapper(ctrl.updateStatusContact));

module.exports = router;
