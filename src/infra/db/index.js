import Sequelize from 'sequelize';
import databaseConfig from '../../shared/config/database.js';
import { Account } from '../../domain/models/Account.js';
import { Expense } from '../../domain/models/Expense.js';
import { ExpenseMember } from '../../domain/models/ExpenseMember.js';
import { ExpensePayment } from '../../domain/models/ExpensePayment.js';
import { Group } from '../../domain/models/Group.js';
import { GroupParticipant } from '../../domain/models/GroupParticipant.js';
import { ExpenseTransaction } from '../../domain/models/ExpenseTransaction.js';
import { Institution } from '../../domain/models/Institution.js';
import { OpenFinanceAccount } from '../../domain/models/OpenFinanceAccount.js';
import { RechargeFundsTransaction } from '../../domain/models/RechargeFundsTransaction.js';
import { User } from '../../domain/models/User.js';
import { PasswordResetCode } from '../../domain/models/PasswordResetCode.js';
import { Notification } from '../../domain/models/Notification.js';

const models = [
  Account,
  Expense,
  ExpenseMember,
  ExpensePayment,
  Group,
  GroupParticipant,
  ExpenseTransaction,
  Institution,
  OpenFinanceAccount,
  RechargeFundsTransaction,
  PasswordResetCode,
  User,
  Notification,
];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models.forEach((model) => model.init(this.connection));
    models.forEach((model) => {
      if (model.associate) {
        model.associate(this.connection.models);
      }
    });
  }
  getQueryInterface() {
    if (!this.connection) {
      throw new Error(
        'Database connection not initialized. Cannot get QueryInterface.',
      );
    }
    return this.connection.getQueryInterface();
  }
}

export default new Database();
