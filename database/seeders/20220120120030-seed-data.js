module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('products', [{
      name: 'Coke',
      price:20,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Pepsi',
      price:25,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Dew',
      price:30,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    ]);

   await queryInterface.bulkInsert('vending_machines', [{
      name: 'drinks machine',
      amount:JSON.stringify({'1':100}),
      token:'123456789',
      status:'ACTIVE',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    ]);

   const [machines] = await queryInterface.sequelize.query('SELECT * FROM vending_machines', {},['id']);
   const [products] = await queryInterface.sequelize.query('SELECT * FROM products', {},['id']);
    for(let i = 0; i < machines.length; i++) {
      for(let j = 0; j < products.length; j++) {
        await queryInterface.bulkInsert('vending_machines_products', [{
          vendingMachineId: machines[i].id,
          productId: products[j].id,
          quantity: 10,
          createdAt: new Date(),
          updatedAt: new Date(),
        }]);
      }
    }
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('products', null, {});
    await queryInterface.bulkDelete('vending_machines', null, {});
    await queryInterface.bulkDelete('vending_machines_products', null, {});
  },
};
