const classA = require("../../models/DAO/admin");
const classAdmin = new classA;
const { log4js } = require('../../middlewares/logger');
const loggerError = log4js.getLogger('error');
const loggerWarning = log4js.getLogger('warn');


const getAdminById = async (req, res) => {
    const id = Number(req.params.id);

    try {
        const admin = await classAdmin.getById(id);
        if (admin.length != 0) {
            res.status(200).json({
                "Status": "Ok",
                "Administrador": admin
            });
        } else {
            loggerWarning.error(`No se encontró administrador con el id ${id}`);
            res.status(404).json(`No se encontró administrador con el id ${id}`);
        };
    } catch (error) {
        loggerError.error(`Ocurrió un error al intentar obtener al administrador con id ${id}: ${error}`);
        res.status(500).json(`Ocurrió un error al intentar obtener al administrador con id ${id}: ${error}`);
    };
};

const modifyAdmin = async (req, res) => {
    const id = Number(req.params.id);
    const data = req.body;

    try {
        const adminById = await classAdmin.getById(id);

        if (adminById) {
            const admin = await classAdmin.modify(id, data);

            if (admin.length != 0) {
                res.status(200).json({
                    "Status": "Ok",
                    "Administrador": admin
                });
            } else {
                loggerWarning.error(`No se encontró administrador con el id ${id}`);
                res.status(404).json(`No se encontró administrador con el id ${id}`);
            };
        } else {
            loggerWarning.error(`No se encontró administrador con el id ${id}`);
            res.status(404).json(`No se encontró administrador con el id ${id}`);
        };
        
    } catch (error) {
        loggerError.error(`Ocurrió un error al intentar modificar los datos del administrador con id ${id}: ${error}`);
        res.status(500).json(`Ocurrió un error al intentar modificar los datos del administrador con id ${id}: ${error}`);
    };
};


module.exports = {
    getAdminById,
    modifyAdmin
};