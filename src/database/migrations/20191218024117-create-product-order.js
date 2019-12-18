'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("product_order", {
      productId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
          model: 'products',
          key: 'id'
        }
      },
      orderId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
          model: 'orders',
          key: 'id'
        }
      },
      quantity: {
        type: Sequelize.DECIMAL(10, 2),
        defaultValue: 0,
        allowNull: false
      } 
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("product_order");
  }
};
