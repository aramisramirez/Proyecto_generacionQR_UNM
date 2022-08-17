const Area = require('../models/areaConocimiento/areaConocimiento');

const checkArea = async (req, res, next) => {

    const area = await Area.findOne({ nombre: req.body.nombre, isActive: true });

    if (area) return res.status(400).json({ message: '¡Esta área de conocimiento ya existe!' });

    next();
}

module.exports = { checkArea }