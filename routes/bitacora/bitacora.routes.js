const { Router } = require('express');
const bitCtrl = require('../../controllers/bitacora/bitacora.controller');
const verifyAuth = require('../../middlewares/isAuth');

const router = Router();

router.get('/:page', verifyAuth.ensureAuth, bitCtrl.getBit);

module.exports = router;
