const Category = require('./models/Category');
const Product = require('./models/Product');

exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getProductsByCategoryType = async (req, res) => {
  try {
    const category = await Category.findOne({ 
      where: { type: req.params.type } 
    });
    
    if (!category) {
      return res.status(404).json({ message: 'Categoría no encontrada' });
    }
    
    const products = await Product.findAll({ 
      where: { categoryId: category.id },
      include: [{ model: Category, attributes: ['name', 'slug', 'type'] }]
    });
    
    res.json({
      category,
      products
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};