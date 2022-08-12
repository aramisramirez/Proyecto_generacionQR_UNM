const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const autoridadSchema = new Schema({
    nombres: {
        type: String,
        required: true
    },
    apellidos: {
        type: String,
        required: true
    },
    cargo: {
        type: String,
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

module.exports = mongoose.model('Autoridad', autoridadSchema);