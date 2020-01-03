import { Model } from 'sequelize';

export default (sequelize, dataTypes) => {
  class ProductOrder extends Model {}

  ProductOrder.init(
    {
      quantity: dataTypes.INTEGER,
    },
    { sequelize, modelName: 'ProductOrder', tableName: 'product_order' }
  );

  ProductOrder.associate = models => {
    models.ProductOrder.belongsTo(models.Product, {
      as: 'product',
      foreignKey: 'product_id',
    });

    models.ProductOrder.belongsTo(models.Order, {
      as: 'order',
      foreignKey: 'order_id',
    });
  };

  return ProductOrder;
};
