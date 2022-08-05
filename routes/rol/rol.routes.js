const { Router } = require('express');
const rolctrl = require('../../controllers/rol/rol.controller');
const verifyRol = require('../../middlewares/verifyRol');
const verifyAuth = require('../../middlewares/isAuth');

const router = Router();

router.post('/add', [verifyAuth.ensureAuth, verifyRol.checkDuplicateRol], rolctrl.add);

module.exports = router;
