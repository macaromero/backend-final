const router = require("express").Router();
const { checkAuth } = require("../middlewares/checkAuth");
const { getOrdersByUserId, createOrder } = require("../controllers/orders");


router.get('/', checkAuth, getOrdersByUserId);
router.post('/', checkAuth, createOrder);

module.exports = router;