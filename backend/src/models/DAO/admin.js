const { adminModel } = require("../DTO/admin");
const { log4js } = require('../../middlewares/logger');
const loggerError = log4js.getLogger('error');


class Admin {

    constructor() {
        this.model = adminModel;
    };

    async getById(id) {
        try {
            const user = await this.model.find({"id": id});
            return user[0];
        } catch (error) {
            loggerError.error(`Ocurrió un error al realizar la búsqueda del administrador con id ${id} en la base de datos: ${error}`);
        };
    };

    async getByUsername(username) {
        try {
            const user = await this.model.find({"username": username});
            return user[0];
        } catch (error) {
            loggerError.error(`Ocurrió un error al realizar la búsqueda del administrador con username ${username} en la base de datos: ${error}`);
        };
    };

    async register (admin) {
        const userSearch = await this.model.find({"username": admin.username});
        const all = await this.model.find();
        try {
            if (userSearch.length === 0) {
                admin.id = all.length + 1;
                const user = new this.model(admin)
                return await user.save();
            } else {
                return undefined;
            };  
        } catch (error) {
            loggerError.error(`Ocurrió un error al intentar crear al administrador en la base de datos: ${error}`);
        };
    };

    async modify(id, obj) {    
        await this.model.updateOne({"id":id}, {$set: obj});
        try {
            const user = await this.model.find({"id": id});
            return user[0];      
        } catch (error) {
            loggerError.error(`Ocurrió un error al intentar modificar al administrador en la base de datos: ${error}`);
        };
    };

    async deleteById(id) {
        try {
            return await this.model.updateOne({"id": id}, {$set: {"habilitado": false}}); 
        } catch (error) {
            loggerError.error(`Ocurrió un error al intentar eliminar al administrador en la base de datos: ${error}`);
        };
    };
};

module.exports = Admin;