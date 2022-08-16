const { Router } = require('express');
const tituloCtrl = require('../../controllers/titulo/titulo.controller');
const verifyAuth = require('../../middlewares/isAuth');
const verifyRegistro = require('../../middlewares/verifyNoRegistro');
const verifyTipoTitulo = require('../../middlewares/verifyTipoTitulo');

const router = Router();

router.post('/add', [verifyAuth.ensureAuth, verifyRegistro.checkDuplicateNoRegistro], tituloCtrl.addTitulo);
router.post('/addTipoTitulo', [verifyAuth.ensureAuth, verifyTipoTitulo.checkTipoTitulo], tituloCtrl.addTipoTitulo);


module.exports = router;
