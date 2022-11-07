// Imports for server config
require('dotenv').config();
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const io = require('socket.io')(server);
const { socketConfig } = require('./config/socket');
const { mongoConnection } = require('./config/mongoDB');
const { log4js } = require('./middlewares/logger');
const logger = log4js.getLogger();
const loggerError = log4js.getLogger('error');

// Route import
const main = require('./routes/main');

// App configuration
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route implementation
app.use('/', main);

// Socket connection
io.on('connection', async socket => {
    socketConfig(socket, io.sockets);
});

// Server connection
server.listen(process.env.PORT || 8080, async () => {
    await mongoConnection();
    try {
        logger.info(`Servidor corriendo en puerto ${process.env.PORT || 8080}`);
    } catch (error) {
        loggerError.error(`Ocurrió un error al intentar conectarse al servidor: ${error}`);
    };  
});