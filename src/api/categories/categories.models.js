import { Model } from 'sequelize';

export default (sequelize, dataTypes) => {
  class Category extends Model {}
  Category.init(
    {
      description: dataTypes.STRING,
    },
    { sequelize, modelName: 'Category' }
  );

  return Category;
};
