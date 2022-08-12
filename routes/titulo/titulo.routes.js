const { Router } = require('express');
const tituloCtrl = require('../../controllers/titulo/titulo.controller');
const verifyAuth = require('../../middlewares/isAuth');
const verifyRegistro = require('../../middlewares/verifyNoRegistro');

const router = Router();

router.post('/add', [verifyAuth.ensureAuth, verifyRegistro.checkDuplicateNoRegistro], tituloCtrl.addTitulo);


module.exports = router;
