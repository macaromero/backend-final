const { productosModel } = require('../DTO/products');
const { log4js } = require('../../middlewares/logger');
const loggerError = log4js.getLogger('error');

class Products {

    constructor() {
        this.model = productosModel;
    };

    async getById(id) {
        try {
            const product = await this.model.find({"id": id});
            return product[0];
        } catch (error) {
            loggerError.error(`Ocurrió un error al realizar la búsqueda del producto con id ${id} en la base de datos: ${error}`);
        };
    };

    async getByCat(categoria) {
        const firstLetter = categoria[0].toUpperCase()
        const cat = firstLetter+categoria.slice(1).toLowerCase()

        try {
            return await this.model.find({"categoria": cat});
        } catch (error) {
            loggerError.error(`Ocurrió un error al realizar la búsqueda de los productos pertenecientes a la categoría ${cat} en la base de datos: ${error}`);
        };
    };

    async getAll() {
        try {
            return await this.model.find({"habilitado": true});
        } catch (error) {
            loggerError.error(`Ocurrió un error al realizar la búsqueda de todos los productos en la base de datos: ${error}`);
        };
    };

    async save (producto) {
        const productSearch = await this.model.find({"nombre": producto.nombre});
        const all = await this.model.find();

        try {
            if (productSearch.length === 0) {
                producto.id = all.length + 1;
                const prod = new this.model(producto)
                return await prod.save();
            } else {
                return undefined;
            }; 
        } catch (error) {
            loggerError.error(`Ocurrió un error al intentar almacenar el producto en la base de datos: ${error}`);
        };
    };

    async modify(id, obj) {    
        await this.model.updateOne({"id": id}, {$set: obj});
        try {
            const product = await this.model.find({"id": id});
            return product[0];      
        } catch (error) {
            loggerError.error(`Ocurrió un error al intentar modificar el producto con id ${id} en la base de datos: ${error}`);
        };
    };

    async deleteById(id) {
        try {
            return await this.model.updateOne({"id": id}, {$set: {"habilitado": false}});
        } catch (error) {
            loggerError.error(`Ocurrió un error al intentar eliminar el producto con id ${id} en la base de datos: ${error}`);
        };
    };
};

module.exports = Products;