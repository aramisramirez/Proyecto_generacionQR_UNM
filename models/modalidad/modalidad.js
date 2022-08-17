const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const modalidadSchema = new Schema({
    nombre: {
        type: String,
        unique: true,
        required: true
    },
    isActive: Boolean,
    userCreacion: String,
}, {
    timestamps: true,
    versionkey: false
});

module.exports = mongoose.model('Modalidad', modalidadSchema);