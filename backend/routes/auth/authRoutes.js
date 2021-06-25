const express = require('express');
const auth = require('../../controllers/authController')
const router = express.Router();

router.route('/register').post(auth.Register);
router.route('/login').post(auth.Login);
router.route('/refresh-token').post(auth.RefreshToken);


module.exports = router;