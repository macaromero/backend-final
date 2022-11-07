const { usuariosModel } = require("../DTO/users");
const { log4js } = require('../../middlewares/logger');
const loggerError = log4js.getLogger('error');

class Users {

    constructor() {
        this.model = usuariosModel;
    };

    async getById(id) {
        try {
            const user = await this.model.find({"id": id});
            return user[0];
        } catch (error) {
            loggerError.error(`Ocurrió un error al realizar la búsqueda del usuario con id ${id} en la base de datos: ${error}`);
        };
    };

    async getByUsername(username) {
        try {
            const user = await this.model.find({"username": username});
            return user[0];
        } catch (error) {
            loggerError.error(`Ocurrió un error al realizar la búsqueda del usuario con username ${username} en la base de datos: ${error}`);
        };
    };

    async getAll() {
        try {
            return await this.model.find();
        } catch (error) {
            loggerError.error(`Ocurrió un error al realizar la búsqueda de todos los usuarios en la base de datos: ${error}`);
        };
    };

    async register (usuario) {
        const userSearch = await this.model.find({"username": usuario.username});
        const all = await this.model.find();
        try {
            if (userSearch.length === 0) {
                usuario.id = all.length + 1;
                const user = new this.model(usuario)
                return await user.save();
            } else {
                return undefined;
            };  
        } catch (error) {
            loggerError.error(`Ocurrió un error al intentar almacenar al usuario en la base de datos: ${error}`);
        };
    };

    async modify(id, obj) {    
        await this.model.updateOne({"id":id}, {$set: obj});
        try {
            const user = await this.model.find({"id": id});
            return user[0];      
        } catch (error) {
            loggerError.error(`Ocurrió un error al intentar modificar el usuario con id ${id} en la base de datos: ${error}`);
        };
    };

    async deleteById(id) {
        try {
            return await this.model.updateOne({"id": id}, {$set: {"habilitado": false}}); 
        } catch (error) {
            loggerError.error(`Ocurrió un error al intentar eliminar el usuario con id ${id} en la base de datos: ${error}`);
        };
    };
};

module.exports = Users;