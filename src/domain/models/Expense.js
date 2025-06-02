import { Model, DataTypes } from 'sequelize';

export class Expense extends Model {
  static init(sequelize) {
    return super.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        group_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        name: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        description: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        value: {
          type: DataTypes.DECIMAL(10, 2),
          allowNull: false,
          defaultValue: 0.0,
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
        expense_type: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        due_date: {
          type: DataTypes.DATEONLY,
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: 'expenses',
        timestamps: true,
        underscored: true,
      },
    );
  }

  static associate(models) {
    this.belongsTo(models.Group, { foreignKey: 'group_id' });
    this.hasMany(models.GroupTransaction, { foreignKey: 'expense_id' });
    this.hasMany(models.ExpenseMember, { foreignKey: 'expense_id' });
    this.hasMany(models.ExpensePayment, { foreignKey: 'expense_id' });
  }
}
