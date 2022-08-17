const TipoTitulo = require('../../models/registroTitulo/tipoTitulo');
const Mes = require('../../models/mes/mes');
const jwt = require('jsonwebtoken');
const config = require('../../database/config');

const getTipoTitulo = async (req, res) => {
    // capture data 
    const { rol } = req.user;
    if (rol === "admin" || rol == "secretario") {

        try {
            let tipos = await TipoTitulo.find({ isActive: true }, { tipoTitulo: 1 });
            if (!tipos.length) {
                message = 'No existen registros';
            }
            const token = jwt.sign({ tipos }, config.secret, {
                expiresIn: 86400 // 24 Hours
            });
            return res.status(200).json({ token });
        }
        catch (e) {
            return res.status(500).json({
                message: '¡Ocurrió un error!'
            });
        }

    } else {
        // Return error
        res.status(200).json({ message: '¡Este usuario no posee permisos para listar tipo de títulos!' });
    }
}


const getMes = async (req, res) => {
    // capture data 
    const { rol } = req.user;
    if (rol === "admin" || rol == "secretario") {

        try {
            let meses = await Mes.find();
            if (!meses.length) {
                message = 'No existen registros';
            }
            return res.status(200).json({ meses });
        }
        catch (e) {
            return res.status(500).json({
                message: '¡Ocurrió un error!'
            });
        }

    } else {
        // Return error
        res.status(200).json({ message: '¡Este usuario no posee permisos para listar meses!' });
    }
}

module.exports = { getTipoTitulo, getMes }