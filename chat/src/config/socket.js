const claseMensajes = require('../models/DAO/mensajes');
const claseChat = new claseMensajes();

const socketConfig = async (socket, sockets) => {
    const getMessages = await claseChat.getAll();

    socket.emit('chat', getMessages);

    socket.on('addMsj', async msj => {
        await claseChat.save(msj);
        sockets.emit('chat', await claseChat.getAll());
    });
};

module.exports = {
    socketConfig
};