const { hash } = require("../../config/bcrypt");
const classA = require('../../models/DAO/admin');
const classAdmin = new classA;
const { generarToken } = require("../../config/jwt");
const { log4js } = require('../../middlewares/logger');
const loggerError = log4js.getLogger('error');
const loggerWarning = log4js.getLogger('warn');


const register = async (req, res) => {
    const {nombre, username} = req.body;
    const admin = {
        nombre,
        username,
        password: hash(req.body.password)
    }

    try {
        const result = await classAdmin.register(admin);

        if (result) {
            const token = generarToken({id: result.id, nombre: result.nombre, username: result.username});
            res.header('authorization', token).status(200).json({
                "Status": "Ok",
                "Administrador": {
                    "id": result.id,
                    "nombre": result.nombre,
                    "username": result.username
                }
            });
        } else {
            loggerWarning.error("Ocurrió un error al intentar crear el administrador, es probable que ya exista un administrador con ese correo electrónico");
            res.status(404).json("Ocurrió un error al intentar crear el administrador, es probable que ya exista un administrador con ese correo electrónico");
        };
    } catch (error) {
        loggerError.error(`Ocurrió un error al intentar crear el administrador, volvé a intentarlo: ${error}`);
        res.status(404).json(`Ocurrió un error al intentar crear el administrador, volvé a intentarlo: ${error}`);
    }
};

module.exports = {
    register
};