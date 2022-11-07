const router = require("express").Router();
const { auth } = require("../../config/jwt");
const { getAdminById, modifyAdmin } = require("../../controllers/admin/admin");


router.get('/:id', auth, getAdminById);
router.put('/:id', auth, modifyAdmin);

module.exports = router;