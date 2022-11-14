const express = require('express');

const { isValidId, validateBody, authorization } = require('../../middleware');
const ctrl = require('../../controllers/users');
const { ctrlWrapper } = require('../../helpers');
const { schemas } = require('../../models/user');


const router = express.Router();

router.post('/register', validateBody(schemas.register, ctrlWrapper(ctrl.signUp)));

router.post('/login', validateBody(schemas.login), ctrlWrapper(ctrl.signIn));

router.post('/logout', authorization, ctrlWrapper(ctrl.logOut));

router.get('/current', authorization, ctrlWrapper(ctrl.current));

router.patch('/users', authorization, ctrlWrapper(ctrl.updateSubscription));

module.exports = router;