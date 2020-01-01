import { Model } from 'sequelize';

export default (sequelize, dataTypes) => {
  class Order extends Model {}

    Order.init(
      {
        price: dataTypes.DECIMAL,
      },
      { sequelize, modelName: 'Order', tableName: 'orders' }
    );

    Order.associate = models => {
      models.Order.belongsTo(models.User, {
        as: 'user',
        foreignKey: 'user_id',
      });
    };
  return Order;
};