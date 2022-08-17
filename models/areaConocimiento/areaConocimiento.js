const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const areaConocimientoSchema = new Schema({
    nombre: {
        type: String,
        unique: true,
        required: true
    },

    carreras: [
        {
            nombreCarrera: {
                type: String,
                unique: true,
                required: true
            },
            tituloOtorgado: {
                type: String,
                unique: true,
                required: true
            }

        }
    ],

}, {
    timestamps: true,
    versionkey: false
});


module.exports = mongoose.model('AreaConocimiento', areaConocimientoSchema);