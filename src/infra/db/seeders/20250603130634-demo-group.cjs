'use strict';

const generateRandomCode = require('../../utils/generateRandomCode.js');

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('groups', [
      {
        access_code: generateRandomCode(6),
        name: 'Família Almeida',
        description: 'Contas da família',
        group_owner: 1,
      },
      {
        access_code: generateRandomCode(6),
        name: 'Amigos da Faculdade',
        description: 'Despesas compartilhadas entre amigos',
        group_owner: 2,
      },
      {
        access_code: generateRandomCode(6),
        name: 'Viagem à Praia',
        description: 'Custos da viagem de dezembro',
        group_owner: 3,
      },
      {
        access_code: generateRandomCode(6),
        name: 'Churrasco Mensal',
        description: 'Grupo do churrasco dos amigos',
        group_owner: 4,
      },
      {
        access_code: generateRandomCode(6),
        name: 'Projeto de Trabalho',
        description: 'Despesas do projeto da empresa',
        group_owner: 5,
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('groups', null, {});
  },
};
