const router = require("express").Router();
const { auth } = require("../../config/jwt");
const { create, modifyCategory, deleteCategory } = require("../../controllers/admin/admin_categories");

router.post('/new', auth, create);
router.put('/:id', auth, modifyCategory);
router.delete('/:id', auth, deleteCategory);

module.exports = router;