const { log4js } = require('../middlewares/logger');
const loggerError = log4js.getLogger('error');


const login = (req, res) => {
    const {username} = req.body;
    const {id} = req.session.passport.user;
    res.status(200).json({
        "Status": "Ok",
        "Usuario": {
            id,
            username
        }
    });
};

const loginError = (req, res) => {
    loggerError.error("Algún dato ingresado es incorrecto, o te faltó completar algún campo");
    res.status(500).json("Algún dato ingresado es incorrecto, o te faltó completar algún campo");
}

module.exports = {
    login,
    loginError
};