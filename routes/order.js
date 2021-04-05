const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order');

// @route   GET /api/auth/test
// @desc    Testing routes
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Auth route Works' }));

router.post('/placeorder', orderController.placeorder);

router.post('/vieworders', orderController.vieworders);
module.exports = router;