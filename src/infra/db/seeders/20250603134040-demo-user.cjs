'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  async up(queryInterface) {
    const hashedPassword = await bcrypt.hash('@Teste123', 9);

    await queryInterface.bulkInsert('users', [
      {
        name: 'João Almeida',
        cpf: '12345678901',
        birth_date: '2000-11-08',
        email: 'conta1@teste.com',
        phone: '55999999999',
        password_hash: hashedPassword,
      },
      {
        name: 'Maria de Freitas',
        cpf: '12345678902',
        birth_date: '2000-11-08',
        email: 'conta2@teste.com',
        phone: '55999999999',
        password_hash: hashedPassword,
      },
      {
        name: 'José Amaral',
        cpf: '12345678903',
        birth_date: '2000-11-08',
        email: 'conta3@teste.com',
        phone: '55999999999',
        password_hash: hashedPassword,
      },
      {
        name: 'Renan do Carmo',
        cpf: '12345678904',
        birth_date: '2000-11-08',
        email: 'conta4@teste.com',
        phone: '55999999999',
        password_hash: hashedPassword,
      },
      {
        name: 'Felipe da Guia',
        cpf: '12345678905',
        birth_date: '2000-11-08',
        email: 'conta5@teste.com',
        phone: '55999999999',
        password_hash: hashedPassword,
      },
      {
        name: 'Gabriel Macedo',
        cpf: '12345678906',
        birth_date: '2000-11-08',
        email: 'conta6@teste.com',
        phone: '55999999999',
        password_hash: hashedPassword,
      },
      {
        name: 'Fernanda da Silva',
        cpf: '12345678907',
        birth_date: '2000-11-08',
        email: 'conta7@teste.com',
        phone: '55999999999',
        password_hash: hashedPassword,
      },
      {
        name: 'Rodrigo Caetano',
        cpf: '12345678908',
        birth_date: '2000-11-08',
        email: 'conta8@teste.com',
        phone: '55999999999',
        password_hash: hashedPassword,
      },
      {
        name: 'Renato Gaúcho',
        cpf: '12345678909',
        birth_date: '2000-11-08',
        email: 'conta9@teste.com',
        phone: '55999999999',
        password_hash: hashedPassword,
      },
      {
        name: 'Mazembe Mundial',
        cpf: '12345678910',
        birth_date: '2000-11-08',
        email: 'conta10@teste.com',
        phone: '55999999999',
        password_hash: hashedPassword,
      },
      {
        name: 'Andrei Albrecht',
        cpf: '12345678911',
        birth_date: '2002-08-10',
        email: 'andreialbrecht@gmail.com',
        phone: '55999999999',
        password_hash: hashedPassword,
      },
      {
        name: 'Alexandre Tonin',
        cpf: '12345678912',
        birth_date: '2001-06-17',
        email: 'xandetonin@gmail.com',
        phone: '55999999999',
        password_hash: hashedPassword,
      },
      {
        name: 'Ruan Oliveira',
        cpf: '12345678913',
        birth_date: '2003-08-25',
        email: 'oliveiraruan2018@gmail.com',
        phone: '55999999999',
        password_hash: hashedPassword,
      },
      {
        name: 'Marcos Schlick',
        cpf: '12345678914',
        birth_date: '2005-11-11',
        email: 'marcosschlick@gmail.com',
        phone: '55999999999',
        password_hash: hashedPassword,
      },
      {
        name: 'Matheus Aguiar',
        cpf: '12345678915',
        birth_date: '2004-04-15',
        email: 'matheus.aguiar068@gmail.com',
        phone: '55999999999',
        password_hash: hashedPassword,
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('users', null, {});
  },
};
