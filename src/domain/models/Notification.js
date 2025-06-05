import { Model, DataTypes } from 'sequelize';

export class Notification extends Model {
  static init(sequelize) {
    return super.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
          allowNull: false,
        },
        user_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        seen: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        recharge_id: {
          type: DataTypes.UUID,
          allowNull: true,
        },
        expense_id: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
      },
      {
        sequelize,
        tableName: 'notifications',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        underscored: true,
      },
    );
  }

  static associate(models) {
    this.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'user',
    });
    this.belongsTo(models.RechargeFundsTransaction, {
      foreignKey: 'recharge_id',
      as: 'recharge',
    });
    this.belongsTo(models.Expense, {
      foreignKey: 'expense_id',
      as: 'expense',
    });
  }
}
