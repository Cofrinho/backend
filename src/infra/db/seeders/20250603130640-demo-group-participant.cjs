'use strict';

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('group_participants', [
      // Grupo 1 (Família)
      {
        group_id: 1,
        user_id: 1,
      },
      {
        group_id: 1,
        user_id: 2,
      },
      {
        group_id: 1,
        user_id: 3,
      },

      // Grupo 2 (Amigos)
      {
        group_id: 2,
        user_id: 2,
      },
      {
        group_id: 2,
        user_id: 3,
      },
      {
        group_id: 2,
        user_id: 4,
      },
      {
        group_id: 2,
        user_id: 5,
      },

      // Grupo 3 (Viagem)
      {
        group_id: 3,
        user_id: 3,
      },
      {
        group_id: 3,
        user_id: 6,
      },
      {
        group_id: 3,
        user_id: 7,
      },

      // Grupo 4 (Churrasco)
      {
        group_id: 4,
        user_id: 4,
      },
      {
        group_id: 4,
        user_id: 8,
      },
      {
        group_id: 4,
        user_id: 9,
      },
      {
        group_id: 4,
        user_id: 10,
      },

      // Grupo 5 (Trabalho)
      {
        group_id: 5,
        user_id: 5,
      },
      {
        group_id: 5,
        user_id: 1,
      },
      {
        group_id: 5,
        user_id: 3,
      },
      {
        group_id: 5,
        user_id: 7,
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('group_participants', null, {});
  },
};
