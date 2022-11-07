const classO = require("../../models/DAO/orders");
const classOrders = new classO;
const { log4js } = require('../../middlewares/logger');
const loggerError = log4js.getLogger('error');


const getAll = async (req, res) => {
    const orders = await classOrders.getAll();

    if (orders != undefined) {
        try {
            res.status(200).json({
                "Status": "Ok",
                "Órdenes": orders
            });
        } catch (error) {
            loggerError.error(`Ocurrió un error al intentar obtener las órdenes: ${error}`);
            res.status(500).json(`Ocurrió un error al intentar obtener las órdenes: ${error}`);
        };
    } else {
        loggerError.error(`Ocurrió un error al intentar obtener las órdenes: ${error}`);
        res.status(500).json(`Ocurrió un error al intentar obtener las órdenes: ${error}`);
    };
};


module.exports = {
    getAll
};