const mongoose = require('mongoose');
const ordersCollection = 'ordenes';

const ordersSchema = new mongoose.Schema({
    id: {type: String},
    comprador:{
        id_comprador: {type: Number, required: true},
        nombre: {type: String, required: true},
        direccion: {type: String, required: true},
        telefono: {type: String, required: true},
        username: {type: String, required: true}
    },
    productos: [
        {
            id_producto: {type: Number, required: true},
            nombre: {type: String, required: true},
            color: {type: String, required: true},
            talle: {type: Number, required: true},
            precio: {type: Number, required: true},
            cantidad: {type: Number, required: true}
        }
    ],
    precioFinal: {type: Number, required: true},
    fecha: {type: String, default: new Date().toLocaleString()},
    habilitado: {type: Boolean, default: true}
});

const ordersModel = new mongoose.model(ordersCollection, ordersSchema);

module.exports = {
    ordersModel,
    ordersSchema
};