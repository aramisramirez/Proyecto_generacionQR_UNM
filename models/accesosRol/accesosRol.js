const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const accesosRolSchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },

    pantallaAcceso: [],

}, {
    timestamps: true,
    versionkey: false
});


module.exports = mongoose.model('AccesosRol', accesosRolSchema);
