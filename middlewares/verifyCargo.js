const Autoridad = require('../models/autoridad/autoridad');

const checkDuplicateCargoAutoridad = async (req, res, next) => {

    const autoridad = await Autoridad.findOne({ cargo: req.body.cargo, isActive: true });

    if (autoridad) return res.status(400).json({ message: '¡Este cargo ya está registrado!' });

    next();
}

module.exports = { checkDuplicateCargoAutoridad }
