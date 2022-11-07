const classC = require("../../models/DAO/categories");
const classCategories = new classC;
const { log4js } = require('../../middlewares/logger');
const loggerError = log4js.getLogger('error');
const loggerWarning = log4js.getLogger('warn');


const create = async (req, res) => {
    let categoria = req.body;

    const category = await classCategories.save(categoria);
    try {
        if (category) {
            res.status(200).json({
                "Status": "Ok",
                "Categoría": category
            });
        } else {

            if (categoria.categoria != undefined) {
                loggerWarning.error(`Ya existe una categoría con el nombre ${categoria.categoria}`);
                res.status(500).json(`Ya existe una categoría con el nombre ${categoria.categoria}`);
            } else {
                loggerWarning.error(`Te faltó ingresar el nombre de la categoría`);
                res.status(500).json(`Te faltó ingresar el nombre de la categoría`);
            }
            
        }

    } catch (error) {
        loggerError.error(`Ocurrió un error al intentar crear la categoría: ${error}`);
        res.status(500).json(`Ocurrió un error al intentar crear la categoría: ${error}`);
    };
};

const modifyCategory = async (req, res) => {
    const id = Number(req.params.id);
    const {categoria} = req.body;

    try {
        const category = await classCategories.modify(id, categoria);

        if (category == false) {
            loggerWarning.error(`No se encontró categoría con el id ${id}`);
            res.status(404).json(`No se encontró categoría con el id ${id}`);
        } else {
            if (category == null) {
                loggerWarning.error(`Ya existe una categoría con el nombre ${categoria}`);
                res.status(404).json(`Ya existe una categoría con el nombre ${categoria}`);
            } else {
                res.status(200).json({
                    "Status": "Ok",
                    "Categoría": category
                });
            }            
        };
    } catch (error) {
        loggerError.error(`Ocurrió un error al intentar modificar los datos de la categoría con id ${id}: ${error}`);
        res.status(500).json(`Ocurrió un error al intentar modificar los datos de la categoría con id ${id}: ${error}`);
    };
};

const deleteCategory = async (req, res) => {
    const id = Number(req.params.id);

    try {
        const category = await classCategories.deleteById(id);
        if (category.modifiedCount != 0) {
            res.status(200).json({
                "Status": "Ok",
                "Response": category
            });
        } else {
            loggerWarning.error(`No se encontró categoría con el id ${id}`);
            res.status(404).json(`No se encontró categoría con el id ${id}`);
        };
    } catch (error) {
        loggerError.error(`Ocurrió un error al intentar eliminar la categoría con id ${id}: ${error}`);
        res.status(500).json(`Ocurrió un error al intentar eliminar la categoría con id ${id}: ${error}`);
    };
};


module.exports = {
    create,
    modifyCategory,
    deleteCategory
};