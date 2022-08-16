const { Router } = require('express');
const sedeCtrl = require('../../controllers/sede/sede.controller');
const verifyAuth = require('../../middlewares/isAuth');
const verifySede = require('../../middlewares/verifySede');

const router = Router();

router.get('/', verifyAuth.ensureAuth, sedeCtrl.getSedes);
router.post('/add', [verifyAuth.ensureAuth, verifySede.checkDuplicateSede], sedeCtrl.add);
router.put('/updateStatus/:id', verifyAuth.ensureAuth, sedeCtrl.updateStatus);

module.exports = router;