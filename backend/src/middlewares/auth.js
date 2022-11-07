const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const classU = require('../models/DAO/users');
const classUsers = new classU;
const { hash, unhash } = require('../config/bcrypt');

passport.use('login', new LocalStrategy({
    passReqToCallback: true
}, async function (req, username, password, next) {
    const user = await classUsers.getByUsername(username);

    if (user) {
        const isPassValid = unhash(password, user.password);
        
        if (isPassValid) {
            return next(null, user);
        } else {
            return next(null, false);
        };

    } else {
        return next(null, false);
    };
}));

passport.use('register', new LocalStrategy({
    passReqToCallback: true,
  }, async function(req, username, password, next) {

    const {nombre, direccion, telefono} = req.body;
    const avatar = req.file.path;
    
    let usuario = {
        nombre,
        direccion,
        telefono,
        avatar,
        username,
        password: hash(password),
    };

    const user = await classUsers.register(usuario);

    if (user) {
        return next(null, user);
    } else {
        return next(null, false);
    };
}));



passport.serializeUser(function(user, next) {
    next(null, user);
});

passport.deserializeUser(function(user, next) {
    let usuario = classUsers.getById(user.id);
    next(null, usuario);
});