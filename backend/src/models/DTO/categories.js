const mongoose = require('mongoose');
const categoriasCollection = 'categorias';

const categoriasSchema = new mongoose.Schema({
    id: {type: Number, required: true},
    categoria: {type: String, required: true},
    habilitado: {type: Boolean, default: true}
});

const categoriasModel = new mongoose.model(categoriasCollection, categoriasSchema);

module.exports = {
    categoriasModel
};