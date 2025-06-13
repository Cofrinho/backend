'use strict';

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('groups', [
      {
        access_code: 'F5H3',
        name: 'Família Almeida',
        description: 'Contas da família',
        group_owner: 1,
      },
      {
        access_code: '537J',
        name: 'Amigos da Faculdade',
        description: 'Despesas compartilhadas entre amigos',
        group_owner: 2,
      },
      {
        access_code: '13H6',
        name: 'Viagem à Praia',
        description: 'Custos da viagem de dezembro',
        group_owner: 3,
      },
      {
        access_code: 'HGFY',
        name: 'Churrasco Mensal',
        description: 'Grupo do churrasco dos amigos',
        group_owner: 4,
      },
      {
        access_code: '34H6',
        name: 'Projeto de Trabalho',
        description: 'Despesas do projeto da empresa',
        group_owner: 5,
      },
      {
        access_code: 'GR78',
        name: 'Futebol de Sexta',
        description: 'Grupo do Futebol',
        group_owner: 11,
      },
      {
        access_code: 'IU12',
        name: 'Eurotrip',
        description: 'Viagem para a Europa',
        group_owner: 12,
      },
      {
        access_code: '984G',
        name: 'Manutenção do Carro',
        description: 'Vaquinha para pagar o carro do Ruan',
        group_owner: 13,
      },
      {
        access_code: '87TR',
        name: 'Chat GPT',
        description: 'Dividir conta GPT',
        group_owner: 14,
      },
      {
        access_code: '2J6L',
        name: 'AWS ECS',
        description: 'Despesas do projeto da empresa',
        group_owner: 15,
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('groups', null, {});
  },
};
