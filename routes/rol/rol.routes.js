const { Router } = require('express');
const rolctrl = require('../../controllers/rol/rol.controller');
const verifyRol = require('../../middlewares/verifyRol');

const router = Router();

router.post('/add', verifyRol.checkDuplicateRol, rolctrl.add);

module.exports = router;
