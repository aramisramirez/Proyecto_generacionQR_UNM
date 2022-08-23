const Titulo = require('../models/registroTitulo/registroTitulo');

const checkDuplicateNoRegistro = async (req, res, next) => {

    const titulo = await Titulo.findOne({ noRegistro: req.body.noRegistro });
    if (titulo) return res.status(400).json({ message: '¡Este número de registro ya existe!' });

    next();
}



module.exports = { checkDuplicateNoRegistro }