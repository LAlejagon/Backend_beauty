const Product = require('./models/Product');
const Category = require('./models/Category');

exports.getProductsByCategory = async (req, res) => {
  try {
    const { slug } = req.params;
    const category = await Category.findOne({ where: { slug } });
    
    if (!category) {
      return res.status(404).json({ message: 'Categoría no encontrada' });
    }
    
    const products = await Product.findAll({ 
      where: { categoryId: category.id },
      include: [{ model: Category, attributes: ['name', 'slug'] }]
    });
    
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};  