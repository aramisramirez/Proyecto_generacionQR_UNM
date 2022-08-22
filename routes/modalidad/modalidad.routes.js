const { Router } = require('express');
const modalidadCtrl = require('../../controllers/modalidad/modalidad.controller');
const verifyModalidad = require('../../middlewares/verifyModalidad');
const verifyAuth = require('../../middlewares/isAuth');

const router = Router();

router.get('/', verifyAuth.ensureAuth, modalidadCtrl.getModalidad);
router.post('/add', [verifyAuth.ensureAuth, verifyModalidad.checkModalidad], modalidadCtrl.addModalidad);
router.put('/updateStatus/:id', verifyAuth.ensureAuth, modalidadCtrl.updateStatus);


module.exports = router;