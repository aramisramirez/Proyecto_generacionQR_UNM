const { Router } = require('express');
const userCtrl = require('../../controllers/user/user.controller');
const verifyAuth = require('../../middlewares/isAuth');

const router = Router();

router.get('/', verifyAuth.ensureAuth, userCtrl.getUsers);


module.exports = router;
