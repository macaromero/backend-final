const router = require("express").Router();
const { get } = require("../controllers/main");


router.get('/', get);


module.exports = router;