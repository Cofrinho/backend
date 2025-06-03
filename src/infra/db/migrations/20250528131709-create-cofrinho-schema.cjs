'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(
      'CREATE EXTENSION IF NOT EXISTS "pgcrypto";',
    );

    await queryInterface.createTable('users', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      name: { type: Sequelize.TEXT, allowNull: false },
      cpf: { type: Sequelize.TEXT, allowNull: false, unique: true },
      birth_date: { type: Sequelize.DATEONLY, allowNull: false },
      email: { type: Sequelize.TEXT, allowNull: false, unique: true },
      phone: { type: Sequelize.TEXT, allowNull: false },
      password_hash: { type: Sequelize.TEXT, allowNull: false },
      avatar_url: { type: Sequelize.TEXT },
      email_verified_at: { type: Sequelize.DATE },
      last_login_at: { type: Sequelize.DATE },
      deactivated_at: { type: Sequelize.DATE },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });

    await queryInterface.createTable('password_reset_codes', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      user_id: { type: Sequelize.INTEGER, allowNull: false },
      code_hash: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      expires_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });

    await queryInterface.createTable('groups', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      access_code: { type: Sequelize.TEXT, allowNull: false, unique: true },
      name: { type: Sequelize.TEXT, allowNull: false },
      description: { type: Sequelize.TEXT },
      group_owner: { type: Sequelize.INTEGER, allowNull: false },
      balance: {
        type: Sequelize.DECIMAL(10, 2),
        defaultValue: 0.0,
        allowNull: false,
      },
      deactivated_at: { type: Sequelize.DATE },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });

    await queryInterface.createTable('group_participants', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      group_id: { type: Sequelize.INTEGER, allowNull: false },
      user_id: { type: Sequelize.INTEGER, allowNull: false },
      deactivated_at: { type: Sequelize.DATE },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });

    await queryInterface.createTable('group_transactions', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('gen_random_uuid()'),
        primaryKey: true,
        allowNull: false,
      },
      group_id: { type: Sequelize.INTEGER, allowNull: false },
      user_id: { type: Sequelize.INTEGER, allowNull: false },
      expense_id: { type: Sequelize.INTEGER, allowNull: false },
      amount: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0.0,
      },
      description: { type: Sequelize.TEXT },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });

    await queryInterface.createTable('accounts', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('gen_random_uuid()'),
        primaryKey: true,
        allowNull: false,
      },
      user_id: { type: Sequelize.INTEGER, allowNull: false, unique: true },
      balance: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0.0,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });

    await queryInterface.createTable('institutions', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      name: { type: Sequelize.TEXT, allowNull: false },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });

    await queryInterface.createTable('open_finance_accounts', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      user_id: { type: Sequelize.INTEGER, allowNull: false },
      institution_id: { type: Sequelize.INTEGER, allowNull: false },
      agency: { type: Sequelize.TEXT, allowNull: false },
      account_number: { type: Sequelize.TEXT, allowNull: false },
      is_active: { type: Sequelize.BOOLEAN, allowNull: false },
      expired_at: { type: Sequelize.DATE },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });

    await queryInterface.createTable('expenses', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      group_id: { type: Sequelize.INTEGER, allowNull: false },
      name: { type: Sequelize.TEXT, allowNull: false },
      description: { type: Sequelize.TEXT },
      value: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0.0,
      },
      status: {
        type: Sequelize.TEXT,
        allowNull: false,
        defaultValue: 'PENDING',
      },
      paid_at: { type: Sequelize.DATE },
      expense_type: { type: Sequelize.TEXT, allowNull: false },
      due_date: { type: Sequelize.DATEONLY, allowNull: false },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });

    await queryInterface.createTable('expense_members', {
      id: { type: Sequelize.BIGINT, autoIncrement: true, primaryKey: true },
      expense_id: { type: Sequelize.INTEGER, allowNull: false },
      user_id: { type: Sequelize.INTEGER, allowNull: false },
      amount: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0.0,
      },
      percentage_paid: { type: Sequelize.DECIMAL(5, 2), allowNull: false },
      status: {
        type: Sequelize.TEXT,
        allowNull: false,
        defaultValue: 'PENDING',
      },
      paid_at: { type: Sequelize.DATE },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });

    await queryInterface.createTable('expenses_payments', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('gen_random_uuid()'),
        primaryKey: true,
      },
      value: { type: Sequelize.DECIMAL(10, 2), allowNull: false },
      expense_id: { type: Sequelize.INTEGER, allowNull: false },
      user_id: { type: Sequelize.INTEGER, allowNull: false },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });

    await queryInterface.createTable('recharge_funds_transactions', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('gen_random_uuid()'),
        primaryKey: true,
        allowNull: false,
      },
      value: { type: Sequelize.DECIMAL(10, 2), allowNull: false },
      user_id: { type: Sequelize.INTEGER, allowNull: false },
      institution_id: { type: Sequelize.INTEGER, allowNull: false },
      type: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      status: {
        type: Sequelize.TEXT,
        allowNull: false,
        defaultValue: 'PENDING',
      },
      created_at: { type: Sequelize.DATE, allowNull: false },
      updated_at: { type: Sequelize.DATE, allowNull: false },
    });

    // Foreign Keys
    await queryInterface.addConstraint('groups', {
      fields: ['group_owner'],
      type: 'foreign key',
      name: 'fk_groups_owner',
      references: { table: 'users', field: 'id' },
    });

    await queryInterface.addConstraint('group_participants', {
      fields: ['group_id'],
      type: 'foreign key',
      name: 'fk_group_participants_group',
      references: { table: 'groups', field: 'id' },
    });

    await queryInterface.addConstraint('group_participants', {
      fields: ['user_id'],
      type: 'foreign key',
      name: 'fk_group_participants_user',
      references: { table: 'users', field: 'id' },
    });

    await queryInterface.addConstraint('group_transactions', {
      fields: ['group_id'],
      type: 'foreign key',
      name: 'fk_group_transactions_group',
      references: { table: 'groups', field: 'id' },
    });

    await queryInterface.addConstraint('group_transactions', {
      fields: ['user_id'],
      type: 'foreign key',
      name: 'fk_group_transactions_user',
      references: { table: 'users', field: 'id' },
    });

    await queryInterface.addConstraint('group_transactions', {
      fields: ['expense_id'],
      type: 'foreign key',
      name: 'fk_group_transactions_expenses',
      references: { table: 'expenses', field: 'id' },
    });

    await queryInterface.addConstraint('accounts', {
      fields: ['user_id'],
      type: 'foreign key',
      name: 'fk_accounts_user',
      references: { table: 'users', field: 'id' },
    });

    await queryInterface.addConstraint('open_finance_accounts', {
      fields: ['user_id'],
      type: 'foreign key',
      name: 'fk_open_finance_user',
      references: { table: 'users', field: 'id' },
    });

    await queryInterface.addConstraint('open_finance_accounts', {
      fields: ['institution_id'],
      type: 'foreign key',
      name: 'fk_open_finance_institution',
      references: { table: 'institutions', field: 'id' },
    });

    await queryInterface.addConstraint('expenses', {
      fields: ['group_id'],
      type: 'foreign key',
      name: 'fk_expenses_group',
      references: { table: 'groups', field: 'id' },
    });

    await queryInterface.addConstraint('expense_members', {
      fields: ['expense_id'],
      type: 'foreign key',
      name: 'fk_expense_members_expense',
      references: { table: 'expenses', field: 'id' },
    });

    await queryInterface.addConstraint('expense_members', {
      fields: ['user_id'],
      type: 'foreign key',
      name: 'fk_expense_members_user',
      references: { table: 'users', field: 'id' },
    });

    await queryInterface.addConstraint('expenses_payments', {
      fields: ['expense_id'],
      type: 'foreign key',
      name: 'fk_expenses_payments_expense',
      references: { table: 'expenses', field: 'id' },
    });

    await queryInterface.addConstraint('expenses_payments', {
      fields: ['user_id'],
      type: 'foreign key',
      name: 'fk_expenses_payments_user',
      references: { table: 'users', field: 'id' },
    });

    await queryInterface.addConstraint('recharge_funds_transactions', {
      fields: ['user_id'],
      type: 'foreign key',
      name: 'fk_recharge_funds_user',
      references: { table: 'users', field: 'id' },
    });

    await queryInterface.addConstraint('recharge_funds_transactions', {
      fields: ['institution_id'],
      type: 'foreign key',
      name: 'fk_recharge_funds_institution',
      references: { table: 'institutions', field: 'id' },
    });

    await queryInterface.addConstraint('password_reset_codes', {
      fields: ['user_id'],
      type: 'foreign key',
      name: 'fk_password_reset_codes_user',
      references: { table: 'users', field: 'id' },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('recharge_funds_transactions');
    await queryInterface.dropTable('expenses_payments');
    await queryInterface.dropTable('expense_members');
    await queryInterface.dropTable('group_transactions');
    await queryInterface.dropTable('expenses');
    await queryInterface.dropTable('open_finance_accounts');
    await queryInterface.dropTable('institutions');
    await queryInterface.dropTable('accounts');
    await queryInterface.dropTable('group_participants');
    await queryInterface.dropTable('groups');
    await queryInterface.dropTable('password_reset_codes');
    await queryInterface.dropTable('users');
  },
};
