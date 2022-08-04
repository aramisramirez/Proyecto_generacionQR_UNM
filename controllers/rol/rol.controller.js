const validator = require('validator');
const config = require('../../database/config');
const jwt = require('jsonwebtoken');
const Rol = require('../../models/rol/rol');

//nuevo usuario
const add = async (req, res) => {
    // capture data 
    const { nombreRol, tipoRol } = req.body;

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
            userCreacion: 'camaradiaga',
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
}


module.exports = { add }

