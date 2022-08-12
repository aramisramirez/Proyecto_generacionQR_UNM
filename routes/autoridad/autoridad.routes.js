const { Router } = require('express');
const autoridadCtrl = require('../../controllers/autoridad/autoridad.controller');
const verifyCargo = require('../../middlewares/verifyCargo');
const verifyAuth = require('../../middlewares/isAuth');

const router = Router();

router.get('/', verifyAuth.ensureAuth, autoridadCtrl.getAutoridad);
router.post('/add', [verifyAuth.ensureAuth, verifyCargo.checkDuplicateCargoAutoridad], autoridadCtrl.addAutoridad);
router.put('/updateStatus/:id', verifyAuth.ensureAuth, autoridadCtrl.updateStatus);


module.exports = router;
