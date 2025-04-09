const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

router.get('/', categoryController.getAllCategories);
router.get('/:type/products', categoryController.getProductsByCategoryType);

module.exports = router;