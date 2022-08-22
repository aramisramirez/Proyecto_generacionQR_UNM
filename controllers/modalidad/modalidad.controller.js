const Modalidad = require('../../models/modalidad/modalidad');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const config = require('../../database/config');


const addModalidad = async (req, res) => {
    // capture data 
    const { rol } = req.user;
    if (rol === "admin") {
        const { nombre } = req.body;
        const { usernameLogin } = req.user;

        // array of validation
        const validate = [
            !validator.isEmpty(nombre)

        ];
        // validate array data and if there is incorrect data return
        if (validate.every(v => v === true)) {
            // Create the object
            const newModalidad = new Modalidad({
                nombre,
                userCreacion: usernameLogin,
                isActive: true
            });

            const savedModalidad = await newModalidad.save();
            // // Response success
            const token = jwt.sign({ id: savedModalidad._id, nombre: savedModalidad.nombre }, config.secret, {
                expiresIn: 86400 // 24 Hours
            });

            res.status(201).json(token);
        } else {
            // Return error
            res.status(200).json({ message: '¡Datos incorrectos!' });
        }
    } else {
        // Return error
        res.status(200).json({ message: '¡Este usuario no posee permisos para agregar una modalidad de graduación!' });
    }
}

const getModalidad = async (req, res) => {
    // capture data 
    const { rol } = req.user;
    if (rol === "admin" || rol == "secretario") {

        try {
            let modalidades = await Modalidad.find({ isActive: true }, { nombre: 1 });
            if (!modalidades.length) {
                message = 'No existen registros';
            }
            return res.status(200).json({ modalidades });
        }
        catch (e) {
            return res.status(500).json({
                message: '¡Ocurrió un error!'
            });
        }

    } else {
        // Return error
        res.status(200).json({ message: '¡Este usuario no posee permisos para modalidades!' });
    }
}

const updateStatus = async (req, res) => {
    const id = req.params.id;
    // capture data 
    const { rol, usernameLogin } = req.user;
    if (rol === "admin") {
        Modalidad.findOneAndUpdate({ _id: id, isActive: true }, { isActive: false, userAnulacion: usernameLogin, fechaAnulacion: new Date() }, { new: true }, (err, modalidadUp) => {
            if (err) return res.status(404).json({ message: '¡Ocurrió un error!' });
            if (!modalidadUp) return res.status(404).json({ message: '¡la modalidad no existe!' });

            const token = jwt.sign({ nombre: modalidadUp.nombre }, config.secret, {
                expiresIn: 86400 // 24 Hours
            });
            return res.status(200).json({ message: '¡Estado actualizado!', token });
        });
    } else {
        // Return error
        res.status(200).json({ message: '¡Este usuario no posee permisos para editar estado de modalidades!' });
    }

}


module.exports = { addModalidad, getModalidad, updateStatus }