const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync();

const hash = (password) => {
    return bcrypt.hashSync(password, salt);
};

const unhash = (password, hashedPassword) => {
    return bcrypt.compareSync(password, hashedPassword);
};

module.exports = {
    hash,
    unhash
};