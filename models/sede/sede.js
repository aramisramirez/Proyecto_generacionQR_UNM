const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sedeSchema = new Schema({

    nombreSede: {
        type: String,
        unique: true,
        required: true
    },
    descripcion: String,
    isActive: Boolean,
    userCreacion: String,
    userAnulacion: String,
    fechaAnulacion: Date,

}, {
    timestamps: true,
    versionkey: false
});


module.exports = mongoose.model('Sede', sedeSchema);
