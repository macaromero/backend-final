const mongoose = require('mongoose');
const mensajesCollection = 'mensajes';

const mensajesSchema = new mongoose.Schema({
    id: {type: Number},
    email: {type: String, required: true},
    tipo: {type: String, default: "user"},
    mensaje: {type: String, required: true},
    fecha: {type: String, default: new Date().toLocaleString()}
});

const mensajesModel = new mongoose.model(mensajesCollection, mensajesSchema);

module.exports = {
    mensajesModel
};