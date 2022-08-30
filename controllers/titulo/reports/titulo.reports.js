const Titulo = require('../../../models/registroTitulo/registroTitulo');


//reportes
const reportTipoEstadoXanio = async (req, res) => {
    // capture data 
    const paramTipo = req.params.tipo;
    const { rol } = req.user;
    if (rol === "admin" || rol == "secretario") {
        //estado
        const paramEstado = req.params.estado;
        const paramAnio = req.params.anio;
        if (paramTipo === "Todos") {
            const registrosTitulo = await Titulo.find({ anioCulminacion: paramAnio });
            //contar registros
            const totalRegistros = await Titulo.find({ anioCulminacion: paramAnio }).countDocuments();
            return res.status(200).json({ totalRegistros, registrosTitulo });
        }
        else {
            const registrosTitulo = await Titulo.find({ tipoTitulo: paramTipo, estado: paramEstado, anioCulminacion: paramAnio });
            //contar registros
            const totalRegistros = await Titulo.find({ tipoTitulo: paramTipo, estado: paramEstado, anioCulminacion: paramAnio }).countDocuments();
            if (registrosTitulo.length > 0) {
                return res.status(200).json({ totalRegistros, registrosTitulo });
            } else {
                // Return error
                res.status(401).json({ message: '¡No existe un registro de título con el tipo, estado y año especificado!' });
            }
        }
    } else {
        // Return error
        res.status(200).json({ message: '¡Este usuario no posee permisos para listar registros por tipo!' });
    }

}



module.exports = { reportTipoEstadoXanio }