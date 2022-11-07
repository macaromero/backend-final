const classC = require("../models/DAO/categories");
const classCategories = new classC;
const { log4js } = require('../middlewares/logger');
const loggerError = log4js.getLogger('error');
const loggerWarning = log4js.getLogger('warn');


const getCategories = async (req, res) => {
    try {
        const all = await classCategories.getAll();
        res.status(200).json({
            "Status": "Ok",
            "Categorías": all
        });
    } catch (error) {
        loggerError.error(`Ocurrió un error al intentar obtener las categorías: ${error}`);
        res.status(500).json(`Ocurrió un error al intentar obtener las categorías: ${error}`);
    };
};

const getCategoryById = async (req, res) => {
    const id = Number(req.params.id);

    if (!isNaN(id)) {
        try {
            const cat = await classCategories.getById(id);
            
            if (cat != undefined) {
                res.status(200).json({
                    "Status": "Ok",
                    "Categoría": cat
                });
            } else {
                loggerWarning.error(`No se encontró categoría con id ${id}`);
                res.status(404).json(`No se encontró categoría con el id ${id}`);
            };
        } catch (error) {
            loggerError.error(`Ocurrió un error al intentar obtener la categoría con id ${id}: ${error}`);
            res.status(500).json(`Ocurrió un error al intentar obtener la categoría con id ${id}: ${error}`);
        };
    } else {
        loggerError.error(`El id ingresado no es válido`);
        res.status(500).json(`El id ingresado no es válido`);
    }
};


module.exports = {
    getCategories,
    getCategoryById
};