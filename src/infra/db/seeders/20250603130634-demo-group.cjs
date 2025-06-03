'use strict';

module.exports = {
  async up(queryInterface) {
    const generateAccessCode = () => {
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      let result = '';
      for (let i = 0; i < 6; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      return result;
    };

    await queryInterface.bulkInsert('groups', [
      {
        access_code: generateAccessCode(),
        name: 'Família Almeida',
        description: 'Contas da família',
        group_owner: 1,
      },
      {
        access_code: generateAccessCode(),
        name: 'Amigos da Faculdade',
        description: 'Despesas compartilhadas entre amigos',
        group_owner: 2,
      },
      {
        access_code: generateAccessCode(),
        name: 'Viagem à Praia',
        description: 'Custos da viagem de dezembro',
        group_owner: 3,
      },
      {
        access_code: generateAccessCode(),
        name: 'Churrasco Mensal',
        description: 'Grupo do churrasco dos amigos',
        group_owner: 4,
      },
      {
        access_code: generateAccessCode(),
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
