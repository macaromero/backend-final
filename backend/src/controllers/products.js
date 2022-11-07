const classP = require("../models/DAO/products");
const classProducts = new classP;
const { log4js } = require('../middlewares/logger');
const loggerError = log4js.getLogger('error');
const loggerWarning = log4js.getLogger('warn');

const getProducts = async (req, res) => {
    try {
        const all = await classProducts.getAll();
        res.status(200).json({
            "Status": "Ok",
            "Productos": all
        });
    } catch (error) {
        loggerError.error(`Ocurrió un error al intentar obtener los productos: ${error}`);
        res.status(500).json(`Ocurrió un error al intentar obtener los productos: ${error}`);
    };
};

const getProductById = async (req, res) => {
    const id = Number(req.params.id);

    if (!isNaN(id)) {
        try {
            const prod = await classProducts.getById(id);
            
            if (prod != undefined) {
                res.status(200).json({
                    "Status": "Ok",
                    "Producto": prod
                });
            } else {
                loggerWarning.error(`No se encontró producto con el id ${id}`);
                res.status(404).json(`No se encontró producto con el id ${id}`);
            };
        } catch (error) {
            loggerError.error(`Ocurrió un error al intentar obtener el producto con id ${id}: ${error}`);
            res.status(500).json(`Ocurrió un error al intentar obtener el producto con id ${id}: ${error}`);
        };
    } else {
        loggerError.error(`El id ingresado no es válido`);
        res.status(500).json(`El id ingresado no es válido`);
    }
};

const getProductsByCat = async (req, res) => {
    const {categoria} = req.params;

    try {
        const products = await classProducts.getByCat(categoria);
        
        if (products.length != 0) {
            res.status(200).json({
                "Status": "Ok",
                "Productos": products
            });
        } else {
            loggerWarning.error(`No se encontraron productos pertenecientes a la categoría ${categoria}, puede que la misma no exista`);
            res.status(404).json(`No se encontraron productos pertenecientes a la categoría ${categoria}, puede que la misma no exista`);
        };
    } catch (error) {
        loggerError.error(`Ocurrió un error al intentar obtener los productos pertenecientes a la categoría ${categoria}: ${error}`);
        res.status(500).json(`Ocurrió un error al intentar obtener los productos pertenecientes a la categoría ${categoria}: ${error}`);
    };
}


module.exports = {
    getProducts,
    getProductById,
    getProductsByCat
};