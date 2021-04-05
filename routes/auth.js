const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');



// @route   GET /api/auth/test
// @desc    Testing routes
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Auth route Works' }));

router.post('/register', authController.register);

router.post('/login', authController.login);

module.exports = router;