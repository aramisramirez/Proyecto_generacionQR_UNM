const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const mesSchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true
    }
}, {
    timestamps: true,
    versionkey: false
});

module.exports = mongoose.model('Mes', mesSchema);