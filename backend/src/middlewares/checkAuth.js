const { log4js } = require('../middlewares/logger');
const loggerWarning = log4js.getLogger('warn');

const checkAuth = (req, res, next) => {
    if(req.isAuthenticated()) {
        return next();
    }
    loggerWarning.error("No estás autorizado para ingresar a esta ruta");
    res.status(401).json("No estás autorizado para ingresar a esta ruta");
};

module.exports = {
    checkAuth
};