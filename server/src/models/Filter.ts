import { Sequelize, DataTypes, Model } from 'sequelize';

export class Filter extends Model {
  public id!: number;
  public categoryId!: string;
  public type!: string;
  public title!: string;
  public desc!: string;
  public detail!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export const FilterInit = (sequelize: Sequelize) => {
  Filter.init({
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    categoryId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    type: {
      type: new DataTypes.STRING(20),
      allowNull: false,
    },
    title: {
      type: new DataTypes.STRING(20),
      allowNull: false,
    },
    desc: {
      type: new DataTypes.STRING(40),
      allowNull: false,
    },
    detail: {
      type: new DataTypes.STRING(40),
      allowNull: false,
    },
  }, {
    sequelize,
    tableName: 'filters',
    engine: 'InnoDB',
    charset: 'utf8',
  });
}