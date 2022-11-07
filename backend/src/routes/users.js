const router = require("express").Router();
const { fileUpload } = require("../config/multer");
const { checkAuth } = require('../middlewares/checkAuth');
const { getUserById, modifyUser, logout } = require("../controllers/users");


router.get('/:id', checkAuth, getUserById);
router.put('/:id', checkAuth, fileUpload.single('avatar'), modifyUser);
router.get('/log/out', checkAuth, logout);

module.exports = router;