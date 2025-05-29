import { Model, DataTypes } from 'sequelize';

export class OpenFinanceAccount extends Model {
  static init(sequelize) {
    return super.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        user_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        institution_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        agency: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        account_number: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        is_active: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
        },
        expired_at: {
          type: DataTypes.DATE,
          allowNull: true,
        },
      },
      {
        sequelize,
        tableName: 'open_finance_accounts',
        timestamps: true,
        underscored: true,
      },
    );
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id' });
    this.belongsTo(models.Institution, { foreignKey: 'institution_id' });
  }
}
