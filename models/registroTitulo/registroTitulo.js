const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const registroSchema = new Schema({
    nombres: {
        type: String,
        required: true
    },
    apellidos: {
        type: String,
        required: true
    },
    sede: {
        type: String,
        required: true
    },
    areaConocimiento: {
        type: String,
        required: true
    },
    carrera: {
        type: String,
        required: true
    },
    carnet: {
        type: String,
        required: true
    },
    cedula: {
        type: String,
        required: true
    },
    sexo: {
        type: String,
        required: true
    },
    tipoTitulo: {
        type: String,
        required: true
    },
    anioCulminacion: {
        type: String,
        required: true
    },
    mesCulminacion: {
        type: String,
        required: true
    },
    modalidad: {
        type: String,
        required: true
    },
    noRegistro: {
        type: String,
        required: true,
        unique: true
    },
    folio: {
        type: String,
        required: true
    },
    tomo: {
        type: String,
        required: true
    },
    fechaInscripcion: {
        type: Date,
        required: true
    },
    rector: {
        type: String,
        required: true
    },
    secretario: {
        type: String,
        required: true
    },
    responsableRegistro: {
        type: String,
        required: true
    },
    estado: String,
    numeroImpresiones: Number,
    isActive: Boolean,
    userCreacion: String,
    userModificacion: String,
    userAnulacion: String,
    fechaAnulacion: Date,

}, {
    timestamps: true,
    versionkey: false
});


module.exports = mongoose.model('Registro', registroSchema);