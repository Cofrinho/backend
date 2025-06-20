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
      {
        name: 'Santander',
        api_url: 'https://bank-account-aggregator.onrender.com',
        logo_url:
          'https://bank-account-aggregator.onrender.com/santander-logo.png',
        color: '#EC0000',
      },
      {
        name: 'Banco Inter',
        api_url: 'https://banco-central-simulator.onrender.com',
        logo_url: 'https://banco-central-simulator.onrender.com/logo.png',
        color: '#FC6800',
      },
      {
        name: 'Itau',
        api_url: 'https://api-itau-banking.onrender.com',
        logo_url: 'https://api-itau-banking.onrender.com/logo_itau.jpg',
        color: '#FF6A00',
      },
      {
        name: 'Banco do Brasil',
        api_url: 'https://api-bank-9iuq.onrender.com',
        logo_url: 'https://api-bank-9iuq.onrender.com/logo.jpeg',
        color: '#FFCC29'
      }
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('institutions', null, {});
  },
};
