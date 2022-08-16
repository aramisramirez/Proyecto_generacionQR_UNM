const TipoTitulo = require('../models/registroTitulo/tipoTitulo');

const checkTipoTitulo = async (req, res, next) => {

    const tipoTitulo = await TipoTitulo.findOne({ tipoTitulo: req.body.tipoTitulo, isActive: true });

    if (tipoTitulo) return res.status(400).json({ message: '¡Este tipo de título ya existe!' });

    next();
}



module.exports = { checkTipoTitulo }