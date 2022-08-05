const { Router } = require('express');
const authCtrl = require('../../controllers/auth/auth.controller');
const verifyUser = require('../../middlewares/verifyUser');
const verifyAuth = require('../../middlewares/isAuth');

const router = Router();

//nuevo usuario
router.post('/signup', [verifyAuth.ensureAuth, verifyUser.checkDuplicateEmail], authCtrl.signUp);
//login
router.post('/signin', authCtrl.signIn);


module.exports = router;
