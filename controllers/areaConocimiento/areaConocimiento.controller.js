
const AreaConocimiento = require('../../models/areaConocimiento/areaConocimiento');
const jwt = require('jsonwebtoken');
const config = require('../../database/config');
const validator = require('validator');

const getAreas = async (req, res) => {

    try {
        let areas = await AreaConocimiento.find({ isActive: true }, { nombre: 1, carreras: 1 });
        if (!areas.length) {
            message = 'No existen registros';
        }
        return res.status(200).json({ areas });
    }
    catch (e) {
        return res.status(500).json({
            message: '¡Ocurrió un error!'
        });
    }
}

const addAreaConocimiento = async (req, res) => {
    // capture data 
    const { rol } = req.user;
    if (rol === "admin") {
        // capture data 
        const { nombre } = req.body;
        const carreras = req.body.carreras;
        const { usernameLogin } = req.user;

        // array of validation
        const validate = [
            !validator.isEmpty(nombre)
        ];
        // validate array data and if there is incorrect data return
        if (validate.every(v => v === true) && (carreras.length > 0)) {
            // Create the object
            const newAreaConocimiento = new AreaConocimiento({
                nombre,
                carreras,
                isActive: true,
                userCreacion: usernameLogin,
                userAnulacion: null,
                fechaAnulacion: null,
            });
            const savedArea = await newAreaConocimiento.save();
            // Response success
            const token = jwt.sign({ id: savedArea._id, nombre: savedArea.nombre, carreras: savedArea.carreras }, config.secret, {
                expiresIn: 86400 // 24 Hours
            });

            res.status(201).json({ message: '¡Área de conocimiento agregada correctamente!', token });

        } else {
            // Return error
            res.status(200).json({ message: '¡Datos incompletos!' });
        }
    } else {
        // Return error
        res.status(200).json({ message: '¡Este usuario no posee permisos para agregar área de conocimiento!' });
    }

}

//eliminar
const updateStatus = async (req, res) => {
    const id = req.params.id;
    // capture data 
    const { rol, usernameLogin } = req.user;
    if (rol === "admin") {
        AreaConocimiento.findOneAndUpdate({ _id: id, isActive: true }, { isActive: false, userAnulacion: usernameLogin, fechaAnulacion: new Date() }, { new: true }, (err, areaUp) => {
            if (err) return res.status(404).json({ message: '¡Ocurrió un error!' });
            if (!areaUp) return res.status(404).json({ message: '¡El área de conocimiento no existe!' });

            const token = jwt.sign({ nombre: areaUp.nombre }, config.secret, {
                expiresIn: 86400 // 24 Hours
            });
            return res.status(200).json({ message: '¡Estado actualizado!', token });
        });
    } else {
        // Return error
        res.status(200).json({ message: '¡Este usuario no posee permisos para editar área de conocimiento!' });
    }

}


const updateAddCarreras = async (req, res) => {

    const id = req.params.id;
    const carrera = req.body.carrera;
    // capture data 
    const { rol, usernameLogin } = req.user;
    if (rol === "admin") {
        AreaConocimiento.findOneAndUpdate({ _id: id, isActive: true }, { $push: { 'carreras': carrera }, userModificacion: usernameLogin }, { new: true }, (err, areaUp) => {
            if (err) return res.status(404).json({ message: '¡Ocurrió un error!' });
            if (!areaUp) return res.status(404).json({ message: '¡El área de conocimiento no existe!' });

            const token = jwt.sign({ nombre: areaUp.nombre }, config.secret, {
                expiresIn: 86400 // 24 Hours
            });
            return res.status(200).json({ message: '¡Estado actualizado!', token });
        });
    } else {
        // Return error
        res.status(200).json({ message: '¡Este usuario no posee permisos para editar área de conocimiento!' });
    }

}

module.exports = { addAreaConocimiento, updateAddCarreras, updateStatus, getAreas }