const { categoriasModel } = require("../DTO/categories");
const { log4js } = require('../../middlewares/logger');
const loggerError = log4js.getLogger('error');

class Categories {

    constructor() {
        this.model = categoriasModel;
    };

    async getById(id) {
        try {
            const category = await this.model.find({"id": id});
            return category[0];
        } catch (error) {
            loggerError.error(`Ocurrió un error al realizar la búsqueda de la categoría con id ${id} en la base de datos: ${error}`);
        };
    };

    async getAll() {
        try {
            return await this.model.find({"habilitado": true});
        } catch (error) {
            loggerError.error(`Ocurrió un error al realizar la búsqueda de todas las categorías en la base de datos: ${error}`);
        };
    };

    async save (categoria) {
        let all = await this.getAll();
        const checkName = all.every(el => categoria.categoria != el.categoria);

        if (checkName) {
            categoria.id = Number(all.length + 1);
            const cat = new this.model(categoria);
            try {
                return await cat.save();
            } catch (error) {
                loggerError.error(`Ocurrió un error al intentar almacenar la categoría en la base de datos: ${error}`);
            };
        } else {
            return undefined;
        };
    };

    async modify(id, cat) {
        let all = await this.getAll();
        const checkId = all.find(el => id == el.id);
        const checkName = all.every(el => cat != el.categoria);

        if(checkId) {
            if(checkName) {
                await this.model.updateOne({"id": id}, {$set: {"categoria": cat}});
                try {
                    return this.getById(id);   
                } catch (error) {
                    loggerError.error(`Ocurrió un error al intentar modificar la categoría con id ${id} en la base de datos: ${error}`);
                };
            } else {
                return null;
            };
        } else {
            return false
        }
        
    };

    async deleteById(id) {
        try {
            return await this.model.updateOne({"id": id}, {$set: {"habilitado": false}}); 
        } catch (error) {
            loggerError.error(`Ocurrió un error al intentar eliminar la categoría con id ${id} en la base de datos: ${error}`);
        };
    };
};

module.exports = Categories;