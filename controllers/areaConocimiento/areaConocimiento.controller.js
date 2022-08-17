
const AreaConocimiento = require('../../models/areaConocimiento/areaConocimiento');
const jwt = require('jsonwebtoken');
const config = require('../../database/config');
const validator = require('validator');


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
            console.log(carreras)
            // Create the object
            // const newAutoridad = new Autoridad({
            //     nombres,
            //     apellidos,
            //     cargo,
            //     isActive: true,
            //     userCreacion: usernameLogin,
            //     userModificacion: null,
            //     userAnulacion: null,
            //     fechaAnulacion: null,
            // });
            // const savedAutoridad = await newAutoridad.save();
            // // // Response success
            // const token = jwt.sign({ id: savedAutoridad._id, nombres: savedAutoridad.nombres, apellidos: savedAutoridad.apellidos, cargo: savedAutoridad.cargo }, config.secret, {
            //     expiresIn: 86400 // 24 Hours
            // });

            // res.status(201).json({ message: '¡Autoridad agregada correctamente!', token });

        } else {
            // Return error
            res.status(200).json({ message: '¡Datos incompletos!' });
        }
    } else {
        // Return error
        res.status(200).json({ message: '¡Este usuario no posee permisos para agregar área de conocimiento!' });
    }

}


module.exports = { addAreaConocimiento }