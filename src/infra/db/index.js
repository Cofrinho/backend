import Sequelize from 'sequelize';
import databaseConfig from '../../shared/config/database.js';
import { Account } from '../../domain/models/Account.js';
import { Expense } from '../../domain/models/Expense.js';
import { ExpenseMember } from '../../domain/models/ExpenseMember.js';
import { ExpensePayment } from '../../domain/models/ExpensePayment.js';
import { Group } from '../../domain/models/Group.js';
import { GroupParticipant } from '../../domain/models/GroupParticipant.js';
import { GroupTransaction } from '../../domain/models/GroupTransaction.js';
import { Institution } from '../../domain/models/Institution.js';
import { OpenFinanceAccount } from '../../domain/models/OpenFinanceAccount.js';
import { RechargeFoundsTransaction } from '../../domain/models/RechargeFoundsTransaction.js';
import { User } from '../../domain/models/User.js';

const models = [
  Account,
  Expense,
  ExpenseMember,
  ExpensePayment,
  Group,
  GroupParticipant,
  GroupTransaction,
  Institution,
  OpenFinanceAccount,
  RechargeFoundsTransaction,
  User,
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
}

export default new Database();
