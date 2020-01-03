import { Model } from 'sequelize';

export default (sequelize, dataTypes) => {
  class Product extends Model {}

  Product.init(
    {
      description: dataTypes.STRING,
      quantity: dataTypes.INTEGER,
      price: dataTypes.DECIMAL,
    },
    { sequelize, modelName: 'Product', tableName: 'products' }
  );

  Product.associate = models => {
    models.Product.belongsTo(models.Category, {
      as: 'category',
      foreignKey: 'category_id',
    });

    models.Product.hasMany(models.ProductOrder, {
      as: 'products',
      foreignKey: 'product_id',
    });
  };

  return Product;
};
