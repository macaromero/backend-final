const get = (req, res) => {
    res.sendFile(__dirname, "index.html");
};

module.exports = {
    get
};
