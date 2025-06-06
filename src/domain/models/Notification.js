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
        type: {
          type: DataTypes.ENUM('TRANSACTION', 'RECHARGE', 'PAYMENT'),
          allowNull: false,
        },
        reference_id: {
          type: DataTypes.UUID,
          allowNull: false,
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
  }
}
