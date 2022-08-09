
const Bit = require('../../models/bitacora/bitacora');
const jwt = require('jsonwebtoken');
const config = require('../../database/config');
const validator = require('validator');



//nuevo registro
const add = async (userFound) => {
    const { nombres, apellidos, username, correo, rol } = userFound;
    // array of validation
    const validate = [
        !validator.isEmpty(nombres),
        !validator.isEmpty(apellidos),
        !validator.isEmpty(username),
        !validator.isEmpty(correo),
        !validator.isEmpty(rol)
    ];
    // validate array data and if there is incorrect data return
    if (validate.every(v => v === true)) {
        // Create the object
        const newBitacora = new Bit({
            nombres,
            apellidos,
            username,
            correo,
            rol
        });

        const savedBit = await newBitacora.save();

        return { status: 200, message: '¡Registro de bitácora añadido!', savedBit };
    } else {
        // Return error
        return { status: 400, message: '¡Datos incorrectos!' };
    }

}



module.exports = { add }