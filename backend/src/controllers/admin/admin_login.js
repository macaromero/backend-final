const { unhash } = require("../../config/bcrypt");
const { generarToken } = require("../../config/jwt");
const classA = require('../../models/DAO/admin');
const classAdmin = new classA;
const { log4js } = require('../../middlewares/logger');
const loggerError = log4js.getLogger('error');
const loggerWarning = log4js.getLogger('warn');


const login = async (req, res) => {
    const {username, password} = req.body;

    const user = await classAdmin.getByUsername(username);

    if (user) {
        const isPassValid = unhash(password, user.password);
        const {id} = user
        
        if (isPassValid) {
            const token = generarToken({username, id});
            res.status(200).header('authorization', token).json({
                "Status": "Ok",
                "Administrador": {
                    id,
                    nombre: user.nombre,
                    username
                },
                "Authorization": token
            });
        } else {
            loggerWarning.error(`La contraseña es incorrecta`);
            res.status(401).json("La contraseña es incorrecta");
        }

    } else {
        loggerError.error(`No se encontró usuario con el username ${username}`);
        res.status(404).json(`No se encontró usuario con el username ${username}`);
    };
};


module.exports = {
    login
};