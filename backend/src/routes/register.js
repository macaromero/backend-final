const router = require("express").Router();
const passport = require('passport');
const { fileUpload } = require('../config/multer');
const { register, registerError } = require("../controllers/register");

router.get('/error', registerError);
router.post('/', fileUpload.single('avatar'), passport.authenticate('register', {failureRedirect:'/register/error'}), register);


module.exports = router;