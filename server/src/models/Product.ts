import { Sequelize, DataTypes, Model } from 'sequelize';

export class Product extends Model {
  public id!: number;
  public userId!: number;
  public categoryId!: number;
  public title!: string;
  public description!: string;
  public price!: number;
  public image!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export const ProductInit = (sequelize: Sequelize) => {
  Product.init({
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL.UNSIGNED,
      allowNull: false,
    },
    title: {
      type: new DataTypes.STRING(200),
      allowNull: false,
    },
    image: {
      type: new DataTypes.STRING(200),
      allowNull: true,
    },
    description: {
      type: new DataTypes.TEXT('long'),
      allowNull: true,
    }
  }, {
    sequelize,
    tableName: 'products',
    engine: 'InnoDB',
    charset: 'utf8',
  })

}