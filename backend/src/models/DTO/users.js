const mongoose = require('mongoose');
const usuariosCollection = 'usuarios';

const usuariosSchema = new mongoose.Schema({
    id: {type: Number, required: true},
    nombre: {type: String, required: true},
    direccion: {type: String, required: true},
    telefono: {type: String, required: true},
    avatar: {type: String, required: true},
    username: {type: String, required: true},
    password: {type: String, required: true},
});

const usuariosModel = new mongoose.model(usuariosCollection, usuariosSchema);

module.exports = {
    usuariosModel
};