import { Sequelize, DataTypes, Model } from 'sequelize';

export class Option extends Model {
  public id!: number;
  public productId!: number;
  public filterId!: number;
  public value!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export const OptionInit = (sequelize: Sequelize) => {
  Option.init({
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    value: {
      type: new DataTypes.STRING(20),
      allowNull: false,
    }
  }, {
    sequelize,
    tableName: 'options',
    engine: 'InnoDB',
    charset: 'utf8',
  });
}