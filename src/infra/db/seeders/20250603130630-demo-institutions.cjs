'use strict';

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('institutions', [
      {
        name: 'Nubank',
        api_url: 'https://apiopenfinancenubank.onrender.com',
        logo_url: 'https://apiopenfinancenubank.onrender.com/logo-nubank.png',
        color: '#A020F0',
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('institutions', null, {});
  },
};
