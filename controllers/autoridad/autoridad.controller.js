
const Autoridad = require('../../models/autoridad/autoridad');
const jwt = require('jsonwebtoken');
const config = require('../../database/config');
const validator = require('validator');


const addAutoridad = async (req, res) => {
    // capture data 
    const { rol } = req.user;
    if (rol === "admin") {
        // capture data 
        const { nombres, apellidos, cargo } = req.body;
        const { usernameLogin } = req.user;

        // array of validation
        const validate = [
            !validator.isEmpty(nombres),
            !validator.isEmpty(apellidos),
            !validator.isEmpty(cargo)
        ];
        // validate array data and if there is incorrect data return
        if (validate.every(v => v === true)) {

            // Create the object
            const newAutoridad = new Autoridad({
                nombres,
                apellidos,
                cargo,
                isActive: true,
                userCreacion: usernameLogin,
                userModificacion: null,
                userAnulacion: null,
                fechaAnulacion: null,
            });
            const savedAutoridad = await newAutoridad.save();
            // // Response success
            const token = jwt.sign({ id: savedAutoridad._id, nombres: savedAutoridad.nombres, apellidos: savedAutoridad.apellidos, cargo: savedAutoridad.cargo }, config.secret, {
                expiresIn: 86400 // 24 Hours
            });

            res.status(201).json({ message: '¡Autoridad agregada correctamente!', token });

        } else {
            // Return error
            res.status(200).json({ message: '¡Datos incorrectos!' });
        }
    } else {
        // Return error
        res.status(200).json({ message: '¡Este usuario no posee permisos para agregar autoridad!' });
    }

}

const getAutoridad = async (req, res) => {
    // capture data 
    const { rol } = req.user;
    if (rol === "admin") {

        try {
            let auts = await Autoridad.find({ isActive: true }, { nombres: 1, apellidos: 1, cargo: 1 });
            if (!auts.length) {
                message = 'No existen registros';
            }
            const token = jwt.sign({ auts }, config.secret, {
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
        res.status(200).json({ message: '¡Este usuario no posee permisos para listar autoridades!' });
    }
}

const updateStatus = async (req, res) => {
    const id = req.params.id;
    // capture data 
    const { rol, usernameLogin } = req.user;
    if (rol === "admin") {
        Autoridad.findOneAndUpdate({ _id: id, isActive: true }, { isActive: false, userAnulacion: usernameLogin, fechaAnulacion: new Date() }, { new: true }, (err, autUp) => {
            if (err) return res.status(404).json({ message: '¡Ocurrió un error!' });
            if (!autUp) return res.status(404).json({ message: '¡la autoridad no existe!' });

            const token = jwt.sign({ cargo: autUp.cargo }, config.secret, {
                expiresIn: 86400 // 24 Hours
            });
            return res.status(200).json({ message: '¡Estado actualizado!', token });
        });
    } else {
        // Return error
        res.status(200).json({ message: '¡Este usuario no posee permisos para editar estado de autoridades!' });
    }

}




module.exports = { getAutoridad, addAutoridad, updateStatus }