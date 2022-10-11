const { Router } = require('express');
const areaCtrl = require('../../controllers/areaConocimiento/areaConocimiento.controller');
const verifyArea = require('../../middlewares/verifyAreaConocimiento');
const verifyAuth = require('../../middlewares/isAuth');
const verifyCarrera = require('../../middlewares/verifyCarrera');

const router = Router();

router.get('/', verifyAuth.ensureAuth, areaCtrl.getAreas);
router.get('/GetAreaCarreras/:nombre', verifyAuth.ensureAuth, areaCtrl.getAreasCarreras);
router.post('/add', [verifyAuth.ensureAuth, verifyArea.checkArea], areaCtrl.addAreaConocimiento);
router.put('/updateAddCarreras/:id', [verifyAuth.ensureAuth, verifyCarrera.checkDuplicateCarrera], areaCtrl.updateAddCarreras);
router.put('/updateStatus/:id', verifyAuth.ensureAuth, areaCtrl.updateStatus);

module.exports = router;
