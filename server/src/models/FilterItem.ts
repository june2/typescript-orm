import { Sequelize, DataTypes, Model } from 'sequelize';

export class FilterItem extends Model {
  public id!: number;
  public filterId!: number;
  public title!: string;
  public desc!: string;
  public value!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export const FilterItemInit = (sequelize: Sequelize) => {
  FilterItem.init({
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    title: {
      type: new DataTypes.STRING(20),
      allowNull: true,
    },
    desc: {
      type: new DataTypes.STRING(40),
      allowNull: true,
    },
    value: {
      type: new DataTypes.STRING(20),
      allowNull: false,
    }
  }, {
    sequelize,
    tableName: 'filter_items',
    engine: 'InnoDB',
    charset: 'utf8',
  });
}