import { Sequelize, DataTypes, Model, HasManyGetAssociationsMixin, HasManyAddAssociationMixin, Association } from 'sequelize';
import { Product } from './Product';
import * as bcrypt from 'bcrypt-nodejs';

export class User extends Model {
  public id!: number;
  public email!: number;
  public password!: string;

  validPassword(password: string) {
    return bcrypt.compareSync(password, this.password);
  }

  public getProducts!: HasManyGetAssociationsMixin<Product>;
  public addProduct!: HasManyAddAssociationMixin<Product, number>;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public static associations: {
    products: Association<User, Product>;
  };
}

export const UserInit = (sequelize: Sequelize) => {
  User.init({
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    email: {
      type: new DataTypes.STRING(20),
      unique: true,
      autoIncrement: false,
      allowNull: false,
    },
    password: {
      type: new DataTypes.STRING(150),
      allowNull: false,
    },
  }, {
    sequelize,
    tableName: 'users',
    engine: 'InnoDB',
    charset: 'utf8',
    indexes: [
      {
        fields: ["email"]
      }
    ],
    hooks: {
      beforeCreate: (user: any) => {
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(user.password, salt);
      }
    }
  });
}