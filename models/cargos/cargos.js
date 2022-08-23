const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const cargosSchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true
    }
}, {
    timestamps: true,
    versionkey: false
});

module.exports = mongoose.model('Cargos', cargosSchema);