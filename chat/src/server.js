require('dotenv').config();
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const io = require('socket.io')(server);
const { socketConfig } = require('./config/socket');
const { mongoConnection } = require('./config/mongoDB');
const main = require('./routes/main');
const { log4js } = require('./middlewares/logger');
const logger = log4js.getLogger();
const loggerError = log4js.getLogger('error');

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/', main);


io.on('connection', async socket => {
    socketConfig(socket, io.sockets);
});

server.listen(process.env.PORT || 8080, async () => {
    await mongoConnection();
    try {
        logger.info(`Servidor corriendo en puerto ${process.env.PORT || 8080}`);
    } catch (error) {
        loggerError.error(`Ocurrió un error al intentar conectarse al servidor: ${error}`);
    };  
});