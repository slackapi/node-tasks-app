'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => queryInterface.addColumn(
    'Tasks',
    'notes',
    {
      type: Sequelize.STRING,
      allowNull: true,
    },
  ),

  down: async (queryInterface) => queryInterface.removeColumn(
    'Tasks',
    'notes',
  ),
};
