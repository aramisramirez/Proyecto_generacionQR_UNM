const Sede = require('../models/sede/sede');

const checkDuplicateSede = async (req, res, next) => {

    const sede = await Sede.findOne({ nombreSede: req.body.nombreSede, isActive: true });

    if (sede) return res.status(400).json({ message: '¡Esta sede ya existe!' });

    next();
}

module.exports = { checkDuplicateSede }