import { Model, DataTypes } from 'sequelize';

export class User extends Model {
  static init(sequelize) {
    return super.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        name: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        cpf: {
          type: DataTypes.TEXT,
          allowNull: false,
          unique: true,
        },
        birth_date: {
          type: DataTypes.DATEONLY,
          allowNull: false,
        },
        email: {
          type: DataTypes.TEXT,
          allowNull: false,
          unique: true,
        },
        phone: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        password_hash: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        avatar_url: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        email_verified_at: {
          type: DataTypes.DATE,
          allowNull: true,
        },
        last_login_at: {
          type: DataTypes.DATE,
          allowNull: true,
        },
        deactivated_at: {
          type: DataTypes.DATE,
          allowNull: true,
        },
      },
      {
        sequelize,
        tableName: 'users',
        timestamps: true,
        underscored: true,
      },
    );
  }

  static associate(models) {
    this.hasMany(models.Group, {
      foreignKey: 'group_owner',
      as: 'ownedGroups',
    });
    this.hasMany(models.GroupParticipant, { foreignKey: 'user_id' });
    this.hasOne(models.Account, { foreignKey: 'user_id' });
    this.hasMany(models.OpenFinanceAccount, { foreignKey: 'user_id' });
    this.hasMany(models.GroupTransaction, { foreignKey: 'user_id' });
    this.hasMany(models.ExpenseMember, { foreignKey: 'user_id' });
    this.hasMany(models.ExpensePayment, { foreignKey: 'user_id' });
    this.hasMany(models.RechargeFundsTransaction, { foreignKey: 'user_id' });
    this.hasMany(models.PasswordResetCode, { foreignKey: 'user_id' });
  }
}
