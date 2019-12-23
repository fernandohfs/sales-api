import { Model } from 'sequelize';

export default (sequelize, dataTypes) => {
  class Category extends Model {}

  Category.init(
    {
      description: dataTypes.STRING,
    },
    { sequelize, modelName: 'Category' }
  );

  Category.associate = models => {
    models.Category.hasMany(models.Product, {
      as: 'products',
      foreignKey: 'category_id',
    });
  };

  return Category;
};
