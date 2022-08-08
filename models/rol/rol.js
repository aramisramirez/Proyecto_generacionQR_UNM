const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const rolSchema = new Schema({
    nombreRol: {
        type: String,
        unique: true,
        required: true
    },

    tipoRol: {
        type: String,
        required: true
    },
    userCreacion: String,
    userModificacion: String,
    userAnulacion: String,
    fechaAnulacion: Date,



}, {
    timestamps: true,
    versionkey: false
});


module.exports = mongoose.model('Rol', rolSchema);
