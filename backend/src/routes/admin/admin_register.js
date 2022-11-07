const router = require("express").Router();
const { register } = require("../../controllers/admin/admin_register");

router.post('/', register);


module.exports = router;