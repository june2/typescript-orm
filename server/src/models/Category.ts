import { Sequelize, DataTypes, Model, HasManyGetAssociationsMixin } from 'sequelize';
import { Product } from './Product';
import { Filter } from './Filter';

export class Category extends Model {
  public id!: number;
  public title!: string;

  public getProducts!: HasManyGetAssociationsMixin<Product>;
  public getFilters!: HasManyGetAssociationsMixin<Filter>;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export const CategoryInit = (sequelize: Sequelize) => {
  Category.init({
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    title: {
      type: new DataTypes.STRING(20),
      allowNull: false,
    }
  }, {
    sequelize,
    tableName: 'categories',
    engine: 'InnoDB',
    charset: 'utf8',
  });

}