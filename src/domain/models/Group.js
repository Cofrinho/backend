import { Model, DataTypes } from 'sequelize';

export class Group extends Model {
  static init(sequelize) {
    return super.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        access_code: {
          type: DataTypes.STRING(4),
          allowNull: false,
          unique: true,
          validate: { len: [4, 4] },
        },
        name: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        description: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        group_owner: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        balance: {
          type: DataTypes.DECIMAL(10, 2),
          allowNull: false,
          defaultValue: 0.0,
        },
        deactivated_at: {
          type: DataTypes.DATE,
          allowNull: true,
        },
      },
      {
        sequelize,
        tableName: 'groups',
        timestamps: true,
        underscored: true,
      },
    );
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'group_owner', as: 'owner' });
    this.hasMany(models.GroupParticipant, { foreignKey: 'group_id' });
    this.hasMany(models.Expense, { foreignKey: 'group_id' });
  }
}
