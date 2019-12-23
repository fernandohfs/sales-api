module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('products', 'quantity', {
      type: Sequelize.INTEGER,
      allowNull: false,
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('products', 'quantity', {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: false,
    });
  },
};
