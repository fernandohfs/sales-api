module.exports = {
  up: queryInterface => {
    return queryInterface.renameColumn('orders', 'price', 'total');
  },

  down: queryInterface => {
    return queryInterface.renameColumn('orders', 'total', 'price');
  },
};
