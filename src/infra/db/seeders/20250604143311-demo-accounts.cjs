'use strict';

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('accounts', [
      {
        user_id: 1,
        balance: 0.0,
      },
      {
        user_id: 2,
        balance: 0.0,
      },
      {
        user_id: 3,
        balance: 0.0,
      },
      {
        user_id: 4,
        balance: 0.0,
      },
      {
        user_id: 5,
        balance: 0.0,
      },
      {
        user_id: 6,
        balance: 0.0,
      },
      {
        user_id: 7,
        balance: 0.0,
      },
      {
        user_id: 8,
        balance: 0.0,
      },
      {
        user_id: 9,
        balance: 0.0,
      },
      {
        user_id: 10,
        balance: 0.0,
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('accounts', null, {});
  },
};
