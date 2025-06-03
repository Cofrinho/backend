import { Model, DataTypes } from 'sequelize';

export class PasswordResetCodes extends Model {
  static init(sequelize) {
    return super.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        code_hash: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        expires_at: {
          type: DataTypes.DATE,
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: 'password_reset_codes',
        timestamps: true,
        underscored: true,
      },
    );
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id' });
  }
}
