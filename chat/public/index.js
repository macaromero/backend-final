const socket = io();
const newMessage = document.querySelector('#newMessageForm');

newMessage.addEventListener('submit', e => {
    e.preventDefault();

    if (((!newMessage[0].value) && (!newMessage[1].value)) || ((!newMessage[0].value) || (!newMessage[1].value))) {
        alert("Necesitás completar los campos para poder usar el chat");
    } else {
        const msj = {
            email: newMessage[0].value,
            fecha: new Date().toLocaleString('es-AR'),
            mensaje: newMessage[1].value
        };
        socket.emit('addMsj', msj);
        newMessage.reset();
    }
});

socket.on('chat', msj => {
    hbsChat(msj)
        .then(html => {
            document.querySelector('#chat').innerHTML = html;
        });
});

const hbsChat = (msj) => {
    return fetch('hbs/chat.handlebars')
        .then(res => res.text())
        .then(chat => {
            const hbs = Handlebars.compile(chat);
            const html = hbs({msj});
            return html;
        });
};