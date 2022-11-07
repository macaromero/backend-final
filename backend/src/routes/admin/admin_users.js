const router = require("express").Router();
const { auth } = require("../../config/jwt");
const { getAll } = require("../../controllers/admin/admin_users");

router.get('/all', auth, getAll);

module.exports = router;