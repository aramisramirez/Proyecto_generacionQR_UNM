const validator = require('validator');
const config = require('../../database/config');
const Sede = require('../../models/sede/sede');
const jwt = require('jsonwebtoken');

const add = async (req, res) => {
    // capture data 
    const { rol } = req.user;
    if (rol === "admin") {
        const { nombreSede, descripcion } = req.body;
        const { usernameLogin } = req.user;

        // array of validation
        const validate = [
            !validator.isEmpty(nombreSede),
            !validator.isEmpty(descripcion)
        ];
        // validate array data and if there is incorrect data return
        if (validate.every(v => v === true)) {
            // Create the object
            const newSede = new Sede({
                nombreSede,
                descripcion,
                userCreacion: usernameLogin,
                isActive: true,
                userAnulacion: null,
                fechaAnulacion: null,
            });

            const savedSede = await newSede.save();
            // // Response success
            const token = jwt.sign({ id: savedSede._id, nombreSede: savedSede.nombreSede }, config.secret, {
                expiresIn: 86400 // 24 Hours
            });

            res.status(201).json(token);
        } else {
            // Return error
            res.status(200).json({ message: '¡Datos incorrectos!' });
        }
    } else {
        // Return error
        res.status(200).json({ message: '¡Este usuario no posee permisos para agregar sedes!' });
    }
}


const getSedes = async (req, res) => {
    // capture data 
    const { rol } = req.user;
    if (rol === "admin" || rol == "secretario") {

        try {
            let sedes = await Sede.find();
            if (!roles.length) {
                message = 'No existen registros';
            }
            const token = jwt.sign({ sedes }, config.secret, {
                expiresIn: 86400 // 24 Hours
            });
            return res.status(200).json({
                token
            });
        }
        catch (e) {
            return res.status(500).json({
                message: '¡Ocurrió un error!'
            });
        }

    } else {
        // Return error
        res.status(200).json({ message: '¡Este usuario no posee permisos para listar sedes!' });
    }
}




module.exports = { add, getSedes }
