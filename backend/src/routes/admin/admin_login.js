const router = require("express").Router();
const { login } = require("../../controllers/admin/admin_login");

router.post('/', login);

module.exports = router;