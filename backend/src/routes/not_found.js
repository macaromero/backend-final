const router = require("express").Router();
const { notFound } = require("../controllers/not_found");

router.get('/', notFound);
router.post('/', notFound);
router.put('/', notFound);
router.patch('/', notFound);
router.delete('/', notFound);

module.exports = router;