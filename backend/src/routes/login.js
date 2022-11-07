const router = require("express").Router();
const passport = require('passport');
const { login, loginError } = require("../controllers/login");

router.get('/error', loginError);
router.post('/', passport.authenticate('login', {failureRedirect:'/login/error'}), login);

module.exports = router;