const { transporter } = require('../config/nodemailer');
const { log4js } = require('../middlewares/logger');
const loggerError = log4js.getLogger('error');


const register = (req, res) => {
    if (req.session.passport.user) {
        const {id, nombre, direccion, telefono, username} = req.session.passport.user;

        // Creación del messageId y de las options del correo electrónico
        let messageId;
        const mailOptions = {
            from: `Mecha Calzados <${process.env.NODEMAILER_USER}>`,
            to: `Mecha Calzados <${process.env.NODEMAILER_USER}>`,
            subject: `Nuevo usuario registrado`,
            text: `Se registró el usuario ${nombre}, cuyo correo electrónico es ${username}.` 
        };

        // Función del envío del correo electrónico
        transporter.sendMail(mailOptions, (error, info) => {
            if(error) {
                loggerError.error(`Ocurrió un error al enviar el correo electrónico: ${error}`);
                return;
            }
            return messageId = info.messageId;
        });

        res.status(200).json({
            "Status": "Ok",
            "Usuario": {
                id,
                nombre,
                direccion,
                telefono,
                "avatar": req.file.path,
                username
            },
            "Correo electrónico": messageId
        });

    } else {
        loggerError.error("No se pudo crear el usuario");
        res.status(501).json("No se pudo crear el usuario");
    }
};

const registerError = (req, res) => {
    loggerError.error("Ya existe un usuario con ese correo electrónico o te faltó completar algún campo");
    res.status(401).json("Ya existe un usuario con ese correo electrónico o te faltó completar algún campo");
}

module.exports = {
    register,
    registerError
};