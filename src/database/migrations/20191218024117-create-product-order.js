module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('product_order', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      product_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'products',
          key: 'id',
        },
        onDelete: 'CASCADE',
        allowNull: false,
      },
      order_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'orders',
          key: 'id',
        },
        onDelete: 'CASCADE',
        allowNull: false,
      },
      quantity: {
        type: Sequelize.DECIMAL(10, 2),
        defaultValue: 0,
        allowNull: false,
      },
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('product_order');
  },
};
