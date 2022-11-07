const router = require("express").Router();
const { getProducts, getProductById, getProductsByCat } = require("../controllers/products");

router.get('/', getProducts);
router.get('/:id', getProductById);
router.get('/category/:categoria', getProductsByCat)

module.exports = router;