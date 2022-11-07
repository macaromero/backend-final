const mongoose = require('mongoose');
const adminCollection = 'administradores';

const adminSchema = new mongoose.Schema({
    id: {type: Number, required: true},
    nombre: {type: String, required: true},
    username: {type: String, required: true},
    password: {type: String, required: true},
});

const adminModel = new mongoose.model(adminCollection, adminSchema);

module.exports = {
    adminModel
};