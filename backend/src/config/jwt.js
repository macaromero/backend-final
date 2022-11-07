const jwt = require('jsonwebtoken');
const { log4js } = require('../middlewares/logger');
const loggerError = log4js.getLogger('error');
const loggerWarning = log4js.getLogger('warn');

const generarToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXP});
};

const auth = (req, res, next) => {
    const token = req.headers['authorization'] || req.headers['x-access-token'];

    if(!token ){
        loggerWarning.error(`No tenés autorización para avanzar`);
        return res.status(404).json(`No tenés autorización para avanzar`);
    } else {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded;
            next();
        } catch (error) {
            loggerError.error(`Ocurrió un error al intentar autenticar tu usuario: ${error}`);
            return res.status(500).json(`Ocurrió un error al intentar autenticar tu usuario: ${error}`);
        }
    }
}

module.exports = {
    generarToken,
    auth
};