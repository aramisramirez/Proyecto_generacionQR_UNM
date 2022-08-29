
const Bit = require('../../models/bitacora/bitacora');
const validator = require('validator');


//nuevo registro
const add = async (userFound, accion) => {

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
            rol,
            accion
        });

        const savedBit = await newBitacora.save();

        return { status: 200, message: '¡Registro de bitácora añadido!', savedBit };
    } else {
        // Return error
        return { status: 400, message: '¡Datos incorrectos!' };
    }

}

const getBit = async (req, res) => {
    // capture data 
    const { rol } = req.user;
    if (rol === "admin") {
        //paginación
        const page = parseInt(req.params.page);

        try {
            //cantidad de registros por página quemado
            const page_size = 5;
            const skip = (page - 1) * page_size;
            const bits = await Bit.find().skip(skip).limit(page_size);
            //contar registros
            const totalRegistros = await Bit.find().countDocuments();
            const numeroPaginas = Math.ceil(totalRegistros / page_size);
            if (!bits.length) {
                message = 'No existen registros';
            }
            return res.status(200).json({ paginaActual: page, numeroPaginas, bits });
        }
        catch (e) {
            return res.status(500).json({
                message: '¡Ocurrió un error!'
            });
        }

    } else {
        // Return error
        res.status(200).json({ message: '¡Este usuario no posee permisos para listar bitácora!' });
    }
}



module.exports = { add, getBit }