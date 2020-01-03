module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface
      .addColumn('product_order', 'created_at', {
        type: Sequelize.DATE,
        allowNull: false,
      })
      .then(() => {
        return queryInterface.addColumn('product_order', 'updated_at', {
          type: Sequelize.DATE,
          allowNull: false,
        });
      });
  },

  down: queryInterface => {
    return queryInterface
      .removeColumn('product_order', 'created_at')
      .then(() => {
        return queryInterface.removeColumn('product_order', 'updated_at');
      });
  },
};
