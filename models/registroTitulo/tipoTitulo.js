const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const tipoTituloSchema = new Schema({
    tipoTitulo: {
        type: String,
        unique: true,
        required: true
    },
    isActive: Boolean,
    userCreacion: String,
    userAnulacion: String,
    fechaAnulacion: Date,

}, {
    timestamps: true,
    versionkey: false
});


module.exports = mongoose.model('TipoTitulo', tipoTituloSchema);