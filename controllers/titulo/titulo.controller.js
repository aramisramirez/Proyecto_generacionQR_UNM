const Titulo = require('../../models/registroTitulo/registroTitulo');
const TipoTitulo = require('../../models/registroTitulo/tipoTitulo');
const jwt = require('jsonwebtoken');
const config = require('../../database/config');
const validator = require('validator');


const addTitulo = async (req, res) => {
    // capture data 
    const { rol } = req.user;
    if (rol === "admin" || rol == "secretario") {
        // capture data 
        const {
            nombres,
            apellidos,
            sede,
            areaConocimiento,
            carrera,
            carnet,
            sexo,
            cedula,
            tipoTitulo,
            anioCulminacion,
            mesCulminacion,
            noRegistro,
            folio,
            tomo,
            fechaInscripcion,
            rector,
            secretario,
            responsableRegistro
        } = req.body;

        const { usernameLogin } = req.user;

        // array of validation
        const validate = [
            !validator.isEmpty(nombres),
            !validator.isEmpty(apellidos),
            !validator.isEmpty(sede),
            !validator.isEmpty(areaConocimiento),
            !validator.isEmpty(carrera),
            !validator.isEmpty(carnet),
            !validator.isEmpty(sexo),
            !validator.isEmpty(cedula),
            !validator.isEmpty(tipoTitulo),
            !validator.isEmpty(anioCulminacion),
            !validator.isEmpty(mesCulminacion),
            !validator.isEmpty(noRegistro),
            !validator.isEmpty(folio),
            !validator.isEmpty(tomo),
            !validator.isEmpty(fechaInscripcion),
            !validator.isEmpty(rector),
            !validator.isEmpty(secretario),
            !validator.isEmpty(responsableRegistro)
        ];

        // validate array data and if there is incorrect data return
        if (validate.every(v => v === true)) {
            // Create the object
            const newTitulo = new Titulo({
                nombres,
                apellidos,
                sede,
                areaConocimiento,
                carrera,
                carnet,
                sexo,
                cedula,
                tipoTitulo,
                anioCulminacion,
                mesCulminacion,
                noRegistro,
                folio,
                tomo,
                fechaInscripcion,
                rector,
                secretario,
                responsableRegistro,
                numeroImpresiones: 0,
                userCreacion: usernameLogin,
                isACtive: true,
                userModificacion: null,
                userAnulacion: null,
                fechaAnulacion: null,
            });

            const savedTitulo = await newTitulo.save();
            // // Response success
            const token = jwt.sign({ id: savedTitulo._id, nombres: savedTitulo.nombres, apellidos: savedTitulo.apellidos, tipoTitulo: savedTitulo.tipoTitulo }, config.secret, {
                expiresIn: 86400 // 24 Hours
            });

            res.status(201).json({ message: '¡Registro de Título agregado correctamente!', token });

        } else {
            // Return error
            res.status(200).json({ message: '¡Datos incorrectos!' });
        }
    } else {
        // Return error
        res.status(200).json({ message: '¡Este usuario no posee permisos para agregar registro de título!' });
    }

}
const addTipoTitulo = async (req, res) => {
    // capture data 
    const { rol } = req.user;
    if (rol === "admin") {
        const { tipoTitulo } = req.body;
        const { usernameLogin } = req.user;

        // array of validation
        const validate = [
            !validator.isEmpty(tipoTitulo)

        ];
        // validate array data and if there is incorrect data return
        if (validate.every(v => v === true)) {
            // Create the object
            const newTipoTitulo = new TipoTitulo({
                tipoTitulo,
                userCreacion: usernameLogin,
                isActive: true,
                userAnulacion: null,
                fechaAnulacion: null,
            });

            const savedTipo = await newTipoTitulo.save();
            // // Response success
            const token = jwt.sign({ id: savedTipo._id, tipoTitulo: savedTipo.tipoTitulo }, config.secret, {
                expiresIn: 86400 // 24 Hours
            });

            res.status(201).json(token);
        } else {
            // Return error
            res.status(200).json({ message: '¡Datos incorrectos!' });
        }
    } else {
        // Return error
        res.status(200).json({ message: '¡Este usuario no posee permisos para agregar tipo de título!' });
    }
}

module.exports = { addTitulo, addTipoTitulo }
