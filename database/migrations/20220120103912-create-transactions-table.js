module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('vending_machines', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      vendingMachineId: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      productId: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      price: {
        allowNull: false,
        type: Sequelize.FLOAT,
      },
      quantity: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      receive: {
        allowNull: false,
        type: Sequelize.FLOAT,
      },
      return: {
        allowNull: false,
        type: Sequelize.FLOAT,
      },
      type:{
        allowNull: false,
        type: Sequelize.STRING,
      }
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('vending_machines');
  },
};
