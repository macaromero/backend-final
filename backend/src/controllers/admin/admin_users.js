const classU = require("../../models/DAO/users");
const classUsers = new classU;
const { log4js } = require('../../middlewares/logger');
const loggerError = log4js.getLogger('error');


const getAll = async (req, res) => {
    const users = await classUsers.getAll();

    if (users != undefined) {
        try {
            res.status(200).json({
                "Status": "Ok",
                "Usuarios": users
            });
        } catch (error) {
            loggerError.error(`Ocurrió un error al intentar obtener los usuarios: ${error}`);
            res.status(500).json(`Ocurrió un error al intentar obtener los usuarios: ${error}`);
        };
    } else {
        loggerError.error(`Ocurrió un error al intentar obtener los usuarios: ${error}`);
        res.status(500).json(`Ocurrió un error al intentar obtener los usuarios: ${error}`);
    };
};


module.exports = {
    getAll
};