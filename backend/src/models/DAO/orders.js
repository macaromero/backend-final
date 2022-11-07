const { ordersModel } = require('../DTO/orders');
const { log4js } = require('../../middlewares/logger');
const loggerError = log4js.getLogger('error');

class Orders {

    constructor() {
        this.model = ordersModel;
    };

    async getById(id) {
        try {
            const order = await this.model.find({"id": id});
            return order[0];
        } catch (error) {
            loggerError.error(`Ocurrió un error al realizar la búsqueda de la orden con id ${id} en la base de datos: ${error}`);
        };
    };

    async getAll() {
        try {
            return await this.model.find();
        } catch (error) {
            loggerError.error(`Ocurrió un error al realizar la búsqueda de todas las órdenes en la base de datos: ${error}`);
        };
    };

    async createOrder(orden) {

        try {
            const order = new this.model(orden)
            return await order.save();
        } catch (error) {
            loggerError.error(`Ocurrió un error al intentar almacenar la orden en la base de datos: ${error}`);
        };
    };

    async getOrders(id) {
        const orders = await this.model.find({"comprador.id_comprador": id});
        
        try {
            if (orders != undefined) {
                let orden = [];
                orders.map(c => {
                    orden.push({"id": c.id, "productos": c.productos, "precioFinal": c.precioFinal, "fecha": c.fecha})
                })
                return orden;
            } else {
                return undefined;
            };  

        } catch (error) {
            loggerError.error(`Ocurrió un error al realizar la búsqueda de las ordenes del usuario con id ${id} en la base de datos: ${error}`);
        };
    };
    
    async addProducts(id_order, product) {
        try {
            const order = await this.getById(id_order);
        
            if (order != undefined) {
                let price = product.cantidad * product.precio;
                product.precioTotal = price;
                order.precioFinal += price;
                order.productos.push(product);
                await this.model.updateMany({"id": id_order}, {$set: {"productos": order.productos, "precioFinal": price + order.precioFinal}});
                return order;
            } else {
                return undefined;
            };  

        } catch (error) {
            loggerError.error(`Ocurrió un error al intentar agregar el producto a la orden con id ${id_order} en la base de datos: ${error}`);
        };
    };

    async deleteProductByOrderId(id_order, id_prod) {
        const order = await this.getById(id_order);

        if (order != undefined) {
            const prod = order.productos.find(p => p.id_producto == id_prod);

            if (prod != undefined) {
                try {
                    return await this.model.updateOne({"id": id_order}, {$pullAll: {"productos": [prod]}});
                } catch (error) {
                    loggerError.error(`Ocurrió un error al intentar eliminar el producto con id ${id_prod} a la orden con id ${id_order} en la base de datos: ${error}`);
                };
            } else {
                return undefined;
            };
        } else {
            return "empty";
        };
    };

    async deleteById(id) {
        try {
            return await this.model.updateOne({"id": id}, {$set: {"habilitado": false}});
        } catch (error) {
            loggerError.error(`Ocurrió un error al intentar eliminar la orden con id ${id} en la base de datos: ${error}`);
        };
    };
};

module.exports = Orders;