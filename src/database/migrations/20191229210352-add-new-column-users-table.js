module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('users', 'type', {
      type: Sequelize.INTEGER,
      defaultValue: 1,
      allowNull: false
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('users', 'type');
  }
};
