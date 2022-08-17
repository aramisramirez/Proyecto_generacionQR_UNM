const { Router } = require('express');
const areaCtrl = require('../../controllers/areaConocimiento/areaConocimiento.controller');
const verifyArea = require('../../middlewares/verifyAreaConocimiento');
const verifyAuth = require('../../middlewares/isAuth');

const router = Router();

router.post('/add', [verifyAuth.ensureAuth, verifyArea.checkArea], areaCtrl.addAreaConocimiento);


module.exports = router;
