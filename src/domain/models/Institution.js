import { Model, DataTypes } from 'sequelize';

export class Institution extends Model {
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
      },
      {
        sequelize,
        tableName: 'institutions',
        timestamps: true,
        underscored: true,
      },
    );
  }

  static associate(models) {
    this.hasMany(models.OpenFinanceAccount, { foreignKey: 'institution_id' });
    this.hasMany(models.RechargeFundsTransaction, {
      foreignKey: 'institution_id',
    });
  }
}
