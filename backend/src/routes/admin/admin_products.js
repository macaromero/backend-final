const router = require("express").Router();
const { auth } = require("../../config/jwt");
const { fileUpload } = require("../../config/multer");
const { create, modifyProduct, deleteProduct } = require("../../controllers/admin/admin_products");

router.post('/new', auth, fileUpload.any('imagen'), create);
router.put('/:id', auth, modifyProduct);
router.delete('/:id', auth, deleteProduct);

module.exports = router;