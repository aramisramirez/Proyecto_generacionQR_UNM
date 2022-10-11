const Titulo = require('../../models/registroTitulo/registroTitulo');
const TipoTitulo = require('../../models/registroTitulo/tipoTitulo');
const jwt = require('jsonwebtoken');
const config = require('../../database/config');
const validator = require('validator');
const Bit = require('../../controllers/bitacora/bitacora.controller');
const tipoTitulo = require('../../models/registroTitulo/tipoTitulo');
const registroTitulo = require('../../models/registroTitulo/registroTitulo');
const user = require('../../models/user/user');

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
            titulo,
            carrera,
            carnet,
            sexo,
            cedula,
            tipoTitulo,
            anioCulminacion,
            modalidad,
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
            !validator.isEmpty(titulo),
            !validator.isEmpty(carrera),
            !validator.isEmpty(carnet),
            !validator.isEmpty(sexo),
            !validator.isEmpty(modalidad),
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
                titulo,
                carrera,
                carnet,
                sexo,
                cedula,
                tipoTitulo,
                modalidad,
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
                estado: "Registro",
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

const buscarXcedula = async (req, res) => {
    // capture data 
    const paramCedula = req.params.cedula;
    const { rol } = req.user;
    if (rol === "admin" || rol == "secretario") {
        const registroTitulo = await Titulo.find({ cedula: paramCedula });
        if (registroTitulo.length > 0) {
            const token = jwt.sign({ registroTitulo }, config.secret, {
                expiresIn: 86400 // 24 Hours
            });
            return res.status(200).json({ token });
        } else {
            // Return error
            res.status(401).json({ message: '¡No existe un registro de título con la cédula especificada!' });
        }

    } else {
        // Return error
        res.status(200).json({ message: '¡Este usuario no posee permisos para listar registros por cédula!' });
    }

}

//buscar registros por tipo de título
const buscarXtipo = async (req, res) => {
    // capture data 
    const paramTipo = req.params.tipo;
    const { rol } = req.user;
    if (rol === "admin" || rol == "secretario") {

        //estado
        const paramEstado = req.params.estado;
        //paginación
        const page = parseInt(req.params.page);
        //cantidad de registros por página quemado
        const page_size = 5;
        const skip = (page - 1) * page_size;
        if (paramTipo === "Todos") {
            const registrosTitulo = await Titulo.find().skip(skip).limit(page_size);
            //contar registros
            const totalRegistros = await Titulo.find().countDocuments();
            const numeroPaginas = Math.ceil(totalRegistros / page_size);
            return res.status(200).json({ numeroPaginas, totalRegistros, registrosTitulo });
        }
        else {
            const registrosTitulo = await Titulo.find({ tipoTitulo: paramTipo, estado: paramEstado }).skip(skip).limit(page_size);
            //contar registros
            const totalRegistros = await Titulo.find({ tipoTitulo: paramTipo, estado: paramEstado }).countDocuments();
            const numeroPaginas = Math.ceil(totalRegistros / page_size);

            if (registrosTitulo.length > 0) {
                return res.status(200).json({ paginaActual: page, numeroPaginas, totalRegistros, registrosTitulo });
            } else {
                // Return error
                res.status(401).json({ message: '¡No existe un registro de título con el tipo y estado de título especificado!' });
            }
        }
    } else {
        // Return error
        res.status(200).json({ message: '¡Este usuario no posee permisos para listar registros por tipo!' });
    }

}

//buscar registros por num registro
const buscarXnoRegistro = async (req, res) => {
    // capture data 
    const paramNoRegistro = req.params.noRegistro;
    const { rol } = req.user;
    const { usernameLogin } = req.user;
    const userFound = {
        nombres: req.user.nombres,
        apellidos: req.user.apellidos,
        username: usernameLogin,
        correo: req.user.correo,
        rol: req.user.rol
    };
    if (rol === "admin" || rol == "secretario" || rol == "registro") {
        const registrosTitulo = await Titulo.find({ noRegistro: paramNoRegistro });
        if (registrosTitulo.length > 0) {
            const accion = "Busqueda de generación de qr";
            const BitGeneracion = await Bit.add(userFound, accion);
            return res.status(200).json({ registrosTitulo,  bitStatus: BitGeneracion.status, bitMessage: BitGeneracion.message });
        } else {
            // Return error
            res.status(401).json({ message: '¡No existe un registro de título con el número de registro especificado!' });
        }

    } else {
        // Return error
        res.status(400).json({ message: '¡Este usuario no posee permisos para listar registros por número de registro!' });
    }

}

const buscarXid = async (req, res) => {
    // capture data 
    const paramid = req.params.id;
    const registrosTitulo = await Titulo.find({ _id: paramid });
    if (registrosTitulo.length > 0) {
        return res.status(200).json({ registrosTitulo });
    } else {
        // Return error
        res.status(401).json({ message: '¡No existe tu registro!' });
    }


}


const updateStatus = async (req, res) => {
    const id = req.params.id;
    const { usernameLogin } = req.user;
    const userFound = {
        nombres: req.user.nombres,
        apellidos: req.user.apellidos,
        username: usernameLogin,
        correo: req.user.correo,
        rol: req.user.rol
    };
    // capture data 
    const { rol } = req.user;
    if (rol === "admin" ||  rol == "secretario" || rol == "registro") {
        Titulo.findOneAndUpdate({ _id: id, estado: 'Registro', numeroImpresiones: 0 }, {  estado: 'Generado'}, { new: true }, (err, userUp) => {
            if (err) return res.status(404).json({ message: '¡Ocurrió un error!' });
            if (!userUp) return res.status(404).json({ message: '¡Este registro no se encontro!' });
            //bitácora
            const accion = "Generación de qr: "+ userUp.nombres;
            Bit.add(userFound, accion);
            const token = jwt.sign({ Titulo: userUp.estado}, config.secret, {
                expiresIn: 86400 // 24 Hours
            });
            return res.status(200).json({ message: '¡Qr Generado!', token });
        });
    } else {
        // Return error
        res.status(400).json({ message: '¡Este usuario no posee permisos para editar estado de usuarios!' });
    }

}


module.exports = { addTitulo, addTipoTitulo, buscarXcedula, buscarXtipo, buscarXnoRegistro, buscarXid, updateStatus }
