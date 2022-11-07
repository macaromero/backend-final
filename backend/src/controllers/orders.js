const classO = require("../models/DAO/orders");
const classOrders = new classO;
const uuid = require("uuid");
const { transporter } = require('../config/nodemailer');
const { log4js } = require('../middlewares/logger');
const loggerError = log4js.getLogger('error');


const getOrdersByUserId = async (req, res) => {
    if (req.session.passport.user) {
        const {id} = req.session.passport.user;

        try {
            const orders = await classOrders.getOrders(id);

            if (orders.length != 0) {
                res.status(200).json({
                    "Status": "Ok",
                    "Órdenes": orders
                })
            } else {
                res.status(200).json({
                    "Status": "Ok",
                    "Órdenes": `No se encontró ninguna orden para el usuario con id ${id}`
                })
            }
        } catch (error) {
            loggerError.error(`Ocurrió un error al intentar obtener las órdenes: ${error}`);
            res.status(500).json(`Ocurrió un error al intentar obtener las órdenes: ${error}`);
        }
    } else {
        res.status(401).json("No estás autorizado para ingresar a esta ruta");
    }
}


const createOrder = async (req, res) => {
    if (req.session.passport.user) {
        const {productos} = req.body;
        const {id, nombre, username, telefono, direccion} = req.session.passport.user;

        // Creación del objeto comprador
        const comprador = {
            id_comprador: id,
            nombre,
            direccion,
            telefono,
            username
        };

        // Función para establecer el precio total de la orden
        const total = () => {
            let totales = []
            productos.map(p => totales.push(p.cantidad * p.precio));
            return totales.reduce((acum, valor) => acum + valor, 0);
        }
        const precioFinal = total()

        // Creación del objeto orden
        const order = {id: uuid.v4(), comprador, productos, precioFinal};

        // Creación del messageId y de las options del correo electrónico
        let messageId;
        const mailOptions = {
            from: `Mecha Calzados <${process.env.NODEMAILER_USER}>`,
            to: `${nombre} <${username}>, Mecha Calzados <${process.env.NODEMAILER_USER}>`,
            subject: `Nuevo pedido de ${nombre} - ${username}`,
            text: JSON.stringify(productos) 
        };

        // Función del envío del correo electrónico
        transporter.sendMail(mailOptions, (error, info) => {
            if(error) {
                loggerError.error(`Ocurrió un error al enviar el correo electrónico: ${error}`);
                return;
            }
            return messageId = info.messageId;
        });
        
        try {
            const result = await classOrders.createOrder(order);

            if (result != undefined) {
                res.status(200).json({
                    "Status": "Ok",
                    "Orden": result,
                    "Correo electrónico": messageId
                });
            } else {
                loggerError.error(`Ocurrió un error al intentar crear el pedido: ${error}`);
                res.status(500).json(`Ocurrió un error al intentar crear el pedido: ${error}`);
            }
            
        } catch (error) {
            loggerError.error(`Ocurrió un error al intentar crear el pedido: ${error}`);
            res.status(500).json(`Ocurrió un error al intentar crear el pedido: ${error}`);
        };
    } else {
        res.status(401).json("No estás autorizado para ingresar a esta ruta");
    }   
};


module.exports = {
    getOrdersByUserId,
    createOrder
};