const Modalidad = require('../models/modalidad/modalidad');

const checkModalidad = async (req, res, next) => {

    const modalidad = await Modalidad.findOne({ nombre: req.body.nombre, isActive: true });

    if (modalidad) return res.status(400).json({ message: '¡Esta modalidad de graduación ya existe!' });

    next();
}

module.exports = { checkModalidad }