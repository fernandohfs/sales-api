import { Model } from 'sequelize';

export default (sequelize, dataTypes) => {
  class Order extends Model {}

  Order.init(
    {
      total: dataTypes.DECIMAL,
    },
    { sequelize, modelName: 'Order', tableName: 'orders' }
  );

  Order.associate = models => {
    models.Order.belongsTo(models.User, {
      as: 'user',
      foreignKey: 'user_id',
    });

    models.Order.hasMany(models.ProductOrder, {
      as: 'orders',
      foreignKey: 'order_id',
    });
  };

  return Order;
};
