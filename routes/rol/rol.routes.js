const { Router } = require('express');
const rolCtrl = require('../../controllers/rol/rol.controller');
const verifyRol = require('../../middlewares/verifyRol');
const verifyAuth = require('../../middlewares/isAuth');

const router = Router();

router.get('/', verifyAuth.ensureAuth, rolCtrl.getRoles);
router.get('/listAccesos', verifyAuth.ensureAuth, rolCtrl.getAccesos);
router.post('/add', [verifyAuth.ensureAuth, verifyRol.checkDuplicateRol], rolCtrl.add);


module.exports = router;
