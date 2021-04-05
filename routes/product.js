const express = require('express');;
const router = express.Router();
const productController = require('../controllers/product');

// @route   GET /api/auth/test
// @desc    Testing routes
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Auth route Works' }));
router.post('/addproduct', productController.addproduct);
router.post('/updateproduct', productController.updateproduct);
router.delete('/deleteproduct', productController.deleteproduct);
router.get('/viewall', productController.viewall);
router.get('/viewsingle', productController.viewsingle);
module.exports = router;