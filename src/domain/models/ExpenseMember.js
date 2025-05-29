import { Model, DataTypes } from 'sequelize';

export class ExpenseMember extends Model {
  static init(sequelize) {
    return super.init(
      {
        id: {
          type: DataTypes.BIGINT,
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        expense_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        user_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        amount: {
          type: DataTypes.DECIMAL(10, 2),
          allowNull: false,
          defaultValue: 0.0,
        },
        percentage_paid: {
          type: DataTypes.DECIMAL(5, 2),
          allowNull: false,
        },
        status: {
          type: DataTypes.TEXT,
          allowNull: false,
          defaultValue: 'PENDING',
        },
        paid_at: {
          type: DataTypes.DATE,
          allowNull: true,
        },
      },
      {
        sequelize,
        tableName: 'expense_members',
        timestamps: true,
        underscored: true,
      },
    );
  }

  static associate(models) {
    this.belongsTo(models.Expense, { foreignKey: 'expense_id' });
    this.belongsTo(models.User, { foreignKey: 'user_id' });
  }
}
