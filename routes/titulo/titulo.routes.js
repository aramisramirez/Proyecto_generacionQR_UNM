const { Router } = require('express');
const tituloCtrl = require('../../controllers/titulo/titulo.controller');
const selectCtrl = require('../../controllers/titulo/selectsTitulo.controller');
const verifyAuth = require('../../middlewares/isAuth');
const verifyRegistro = require('../../middlewares/verifyNoRegistro');
const verifyTipoTitulo = require('../../middlewares/verifyTipoTitulo');

const router = Router();

router.get('/getMeses', verifyAuth.ensureAuth, selectCtrl.getMes);
router.get('/getTipos', verifyAuth.ensureAuth, selectCtrl.getTipoTitulo);
router.get('/buscarXcedula', verifyAuth.ensureAuth, tituloCtrl.buscarXcedula);
router.post('/add', [verifyAuth.ensureAuth, verifyRegistro.checkDuplicateNoRegistro], tituloCtrl.addTitulo);
router.post('/addTipoTitulo', [verifyAuth.ensureAuth, verifyTipoTitulo.checkTipoTitulo], tituloCtrl.addTipoTitulo);


module.exports = router;
