const express = require('express');

const { isValidId, validateBody, authorization } = require('../../middleware');
const ctrl= require('../../controllers/contacts');
const { ctrlWrapper } = require('../../helpers');
const { schemas } = require('../../models/contact');


const router = express.Router();



router.get('/', authorization, ctrlWrapper(ctrl.getContactsList) );

router.get('/:id', authorization,isValidId, ctrlWrapper(ctrl.getContactById));

router.post('/',authorization,validateBody(schemas.contactInfo), ctrlWrapper(ctrl.createContact) );

router.put('/:id',authorization,isValidId, validateBody(schemas.contactInfo), ctrlWrapper(ctrl.updateContact));

router.delete('/:id', authorization,isValidId, ctrlWrapper(ctrl.removeContact));

router.patch('/:id/favorite', authorization,isValidId, validateBody(schemas.favorite), ctrlWrapper(ctrl.updateStatusContact));

module.exports = router;
