const AreaConocimiento = require('../models/areaConocimiento/areaConocimiento');

const checkDuplicateCarrera = async (req, res, next) => {

    const carreraAdd = req.body.carrera;
    //buscar que la nueva carrera no exista en el array existente
    const x = await AreaConocimiento.find({ "carreras.nombreCarrera": carreraAdd.nombreCarrera });
    if (x.length > 0) return res.status(400).json({ message: '¡Esta área de conocimiento ya existe!' });

    next();

}

module.exports = { checkDuplicateCarrera }