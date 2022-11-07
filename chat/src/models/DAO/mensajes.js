const { mensajesModel } = require("../DTO/mensajes");
const { log4js } = require('../../middlewares/logger');
const loggerError = log4js.getLogger('error');

// Clase Mensajes
class Mensajes {

    constructor() {
        this.model = mensajesModel;
    };
    
    async getAll() {
        try {
            return await this.model.find();
        } catch (error) {
            loggerError.error(`Ocurrió un error al realizar la búsqueda en la base de datos, volvé a intentarlo: ${error}`);
        };
    };

    async save (obj) {
        try {
            const all = await this.model.find();
            obj.id = all.length + 1;
            const message = new this.model(obj)
            return await message.save();
        } catch (error) {
            loggerError.error(`Ocurrió un error al intentar almacenar el mensaje en la base de datos, volvé a intentarlo: ${error}`);
        };
    };
    
};

module.exports = Mensajes;