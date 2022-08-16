const validator = require('validator');
const config = require('../../database/config');
const jwt = require('jsonwebtoken');
const Rol = require('../../models/rol/rol');
const Accesos = require('../../models/accesosRol/accesosRol');

const add = async (req, res) => {
    // capture data 
    const { rol } = req.user;
    if (rol === "admin") {
        const { nombreRol, tipoRol } = req.body;
        const { usernameLogin } = req.user;

        // array of validation
        const validate = [
            !validator.isEmpty(nombreRol),
            !validator.isEmpty(tipoRol),

        ];
        // validate array data and if there is incorrect data return
        if (validate.every(v => v === true)) {
            // Create the object
            const newRol = new Rol({
                nombreRol,
                tipoRol,
                userCreacion: usernameLogin,
                userModificacion: null,
                userAnulacion: null,
                fechaAnulacion: null,
            });

            const savedRol = await newRol.save();
            // // Response success
            const token = jwt.sign({ id: savedRol._id, nombreRol: savedRol.nombreRol }, config.secret, {
                expiresIn: 86400 // 24 Hours
            });

            res.status(201).json(token);
        } else {
            // Return error
            res.status(200).json({ message: '¡Datos incorrectos!' });
        }
    } else {
        // Return error
        res.status(200).json({ message: '¡Este usuario no posee permisos para agregar roles!' });
    }
}


const getRoles = async (req, res) => {
    // capture data 
    const { rol } = req.user;
    if (rol === "admin") {

        try {
            let roles = await Rol.find();
            if (!roles.length) {
                message = 'No existen registros';
            }
            const token = jwt.sign({ roles }, config.secret, {
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
        res.status(200).json({ message: '¡Este usuario no posee permisos para listar roles!' });
    }
}

const getAccesos = async (req, res) => {
    // capture data 
    const { rol } = req.user;
    if (rol === "admin") {

        try {

            let accesos = await Accesos.find();

            if (!accesos.length) {
                message = 'No existen registros';
            }
            const token = jwt.sign({ accesos }, config.secret, {
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
        res.status(200).json({ message: '¡Este usuario no posee permisos para listar accesos!' });
    }
}




module.exports = { add, getRoles, getAccesos }

