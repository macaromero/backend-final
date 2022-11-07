const mongoose = require('mongoose');
const productosCollection = 'productos';

const productosSchema = new mongoose.Schema({
    id: {type: Number, required: true},
    nombre: {type: String, required: true},
    color: {type: Array, of: String, required: true},
    talle: {type: Array, of: Number, required: true},
    imagen: {type: Array, of: String, required: true},
    imagenAlt: {type: Array, of: String, required: true},
    id_categoria: {type: Number, required: true},
    categoria: {type: String, required: true},
    precio: {type: Number, required: true},
    stock: {type: Number, required: true},
    fecha: {type: String, default: new Date().toLocaleString()},
    habilitado: {type: Boolean, default: true}
});

const productosModel = new mongoose.model(productosCollection, productosSchema);

module.exports = {
    productosModel
};