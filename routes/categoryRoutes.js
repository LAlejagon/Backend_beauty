const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

router.get('/:slug/products', categoryController.getProductsByCategorySlug);

router.get('/', categoryController.getAllCategories);

module.exports = router;