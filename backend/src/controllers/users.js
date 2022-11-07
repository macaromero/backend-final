const classU = require("../models/DAO/users");
const classUsers = new classU;
const { log4js } = require('../middlewares/logger');
const loggerError = log4js.getLogger('error');
const loggerWarning = log4js.getLogger('warn');


const getUserById = async (req, res) => {
    const {id} = req.session.passport.user;

    if (id == req.params.id) {
        try {
            const user = await classUsers.getById(id);
            if (user != undefined) {
                res.status(200).json({
                    "Status": "Ok",
                    "Usuario": user
                });
            } else {
                loggerWarning.error(`No se encontró usuario con el id ${id}`);
                res.status(404).json(`No se encontró usuario con el id ${id}`);
            };
        } catch (error) {
            loggerError.error(`Ocurrió un error al intentar obtener el usuario con id ${id}: ${error}`);
            res.status(500).json(`Ocurrió un error al intentar obtener el usuario con id ${id}: ${error}`);
        };
    } else {
        loggerWarning.error("No estás autorizado para ingresar a esta ruta");
        res.status(401).json("No estás autorizado para ingresar a esta ruta");
    }

    
};

const modifyUser = async (req, res) => {
    const {id} = req.session.passport.user;
    const data = req.body;
    
    if (req.file) {
        data.avatar = req.file.path
    }    

    if (id == req.params.id) {
        try {
            const user = await classUsers.modify(id, data);
            if (user.length != 0) {
                res.status(200).json({
                    "Status": "Ok",
                    "Usuario": user
                });
            } else {
                loggerWarning.error(`No se encontró usuario con el id ${id}`);
                res.status(404).json(`No se encontró usuario con el id ${id}`);
            };
        } catch (error) {
            loggerError.error(`Ocurrió un error al intentar modificar los datos del usuario con id ${id}: ${error}`);
            res.status(500).json(`Ocurrió un error al intentar modificar los datos del usuario con id ${id}: ${error}`);
        };
    } else {
        loggerWarning.error("No estás autorizado para ingresar a esta ruta");
        res.status(401).json("No estás autorizado para ingresar a esta ruta");
    }
};

const logout = (req, res) => {
    req.session.destroy( error => {
        if(error) {
            loggerError.error(`Ocurrió un error al intentar cerrar la sesión del usuario: ${error}`);
            return res.status(400).json(`Ocurrió un error al intentar cerrar la sesión del usuario: ${error}`);
        } else {
            res.status(200).json("Se cerró tu sesión")
        }
    })
};


module.exports = {
    getUserById,
    modifyUser,
    logout
};