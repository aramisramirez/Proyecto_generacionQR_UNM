const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const bitacoraSchema = new Schema({
    nombres: {
        type: String,
        required: true
    },
    apellidos: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    correo: {
        type: String,
        required: true
    },
    rol: {
        type: String,
        required: true
    },
    accion: String
}, {
    timestamps: true,
    versionkey: false
});


module.exports = mongoose.model('Bitacora', bitacoraSchema);
