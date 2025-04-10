module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    type: {
      type: DataTypes.ENUM(
        'ojos',
        'labios',
        'rostro',
        'cuidado-facial',
        'cuidado-corporal',
        'accesorios'
      ),
      allowNull: false
    }
  }, {
    timestamps: true
  });

  return Category;
};