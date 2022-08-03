const { Router } = require('express');
const authctrl = require('../../controllers/auth/auth.controller');
const verifyUser = require('../../middlewares');

const router = Router();

router.post('/signup', authctrl.signUp);


module.exports = router;
