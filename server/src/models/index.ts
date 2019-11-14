import { Sequelize } from 'sequelize';
import { User, UserInit } from './User';
import { Product, ProductInit } from './Product';
import { Category, CategoryInit } from './Category';
import { Option, OptionInit } from './Option';
import { Filter, FilterInit } from './Filter';
import { FilterItem, FilterItemInit } from './FilterItem';
import config from '../config';

export function init(): Sequelize {
  const connectionUrl: string = config.db.url;
  const sequelize = new Sequelize(connectionUrl);

  // Init schema
  UserInit(sequelize);
  CategoryInit(sequelize);
  ProductInit(sequelize);
  OptionInit(sequelize);
  FilterInit(sequelize);
  FilterItemInit(sequelize);

  // Relation  
  User.hasMany(Product, {
    sourceKey: 'id',
    foreignKey: 'userId',
    as: 'products',
  })

  Category.hasMany(Product, {
    sourceKey: 'id',
    foreignKey: 'categoryId',
    as: 'products',
  })

  Category.hasMany(Filter, {
    sourceKey: 'id',
    foreignKey: 'categoryId',
    as: 'filters',
  })

  Product.hasMany(Option, {
    sourceKey: 'id',
    foreignKey: 'productId',
    as: 'options',
  })

  Filter.hasMany(FilterItem, {
    sourceKey: 'id',
    foreignKey: 'filterId',
    as: 'items',
  })

  Filter.hasMany(Option, {
    sourceKey: 'id',
    foreignKey: 'filterId',
    as: 'options',
  })

  Product.belongsTo(Category, {
    onDelete: 'cascade',
    foreignKey: {
      field: 'categoryId',
      allowNull: false,
    },
    as: 'category'
  });

  Option.belongsTo(Filter, {
    onDelete: 'cascade',
    foreignKey: {
      field: 'filterId',
      allowNull: false,
    },
    as: 'filter'
  });

  return sequelize;
}


