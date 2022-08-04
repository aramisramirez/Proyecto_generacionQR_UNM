const { Router } = require('express');
const authctrl = require('../../controllers/auth/auth.controller');
const verifyUser = require('../../middlewares/verifyUser');

const router = Router();

router.post('/signup', verifyUser.checkDuplicateEmail, authctrl.signUp);
router.post('/signin', authctrl.signIn);


module.exports = router;
