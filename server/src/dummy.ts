import { User } from './models/User';
import { Product } from './models/Product';
import { Category } from './models/Category';
import { Filter } from './models/Filter';
import { FilterItem } from './models/FilterItem';
import { Option } from './models/Option';
import { title, image, desc } from './dummy_desc';
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
// import { Sequelize } from 'sequelize/types';


export const initData = async () => {
  const user = await User.create({ email: 'test@test.com', password: 'test123' })

  // Create category
  const categriesData = [
    { title: '차량' },
    { title: '인기매물' },
    { title: '가구/인테리어' },
    { title: '유아동/유아도서' },
    { title: '생활/가공식품' }
  ];
  const categries = await Category.bulkCreate(categriesData);
  const categoryId = categries[0].id;

  // Create filter
  const filtersData = [
    { categoryId: categoryId, type: 'RANGE', title: '차량 연식 범위', desc: '차량 연식을 선택해주세요', detail: '차량 연식' },
    { categoryId: categoryId, type: 'RANGE_TEXT', title: '차량 주행 거리', desc: '주행거리를 입력해주세요.(km)', detail: '주행 거리' },
    { categoryId: categoryId, type: 'CHOICE', title: '차량 판매자 흡연 여부', desc: '차량 판매자 흡연 여부', detail: '판매자 흡연 여부' },
  ]
  const filters = await Filter.bulkCreate(filtersData);
  const filterItemsData = [
    { filterId: filters[0].id, tilte: '', desc: '년', min: 2010, max: 2020 },
    { filterId: filters[1].id, tilte: '', desc: 'km', min: 0, max: 10000 },
    { filterId: filters[2].id, tilte: '흡연', desc: '예, 흡연자 입니다.', value: 1 },
    { filterId: filters[2].id, tilte: '비흡연', desc: '아니오, 비 흡연자 입니다.', value: 0 },
  ]
  const filterItem = await FilterItem.bulkCreate(filterItemsData);

  // Create prdocut
  const product = await Product.bulkCreate([
    { userId: user.id, categoryId: categoryId, title: title, price: 1000, image: image, description: desc },
    { userId: user.id, categoryId: categoryId, title: title, price: 2000, image: image, description: desc },
    { userId: user.id, categoryId: categoryId, title: title, price: 3000, image: image, description: desc },
  ]);
  const optionData = [
    { productId: product[0].id, filterId: filters[0].id, value: 2014 },
    { productId: product[0].id, filterId: filters[1].id, value: 10000 },
    { productId: product[0].id, filterId: filters[2].id, value: 1 },

    { productId: product[1].id, filterId: filters[0].id, value: 2015 },
    { productId: product[1].id, filterId: filters[1].id, value: 20000 },
    { productId: product[1].id, filterId: filters[2].id, value: true },

    { productId: product[2].id, filterId: filters[0].id, value: 2014 },
    { productId: product[2].id, filterId: filters[1].id, value: 20000 },
    { productId: product[2].id, filterId: filters[2].id, value: 0 },
  ]
  await Option.bulkCreate(optionData);

  // const products = await Product.findAll({
  //   include: [{
  //     model: Option,
  //     as: 'options',
  //     where: {
  //       [Op.or]: [
  //         { [Op.and]: [{ filterId: 3 }, { value: 'true' }] },
  //         { [Op.and]: [{ filterId: 1 }, { value: '2015' }] },
  //       ]
  //     },
  //     // where: {
  //     //   '$or': [
  //     //     { '$and': [{ filterId: 3 }, { value: 'true' }] },
  //     //     { '$and': [{ filterId: 1 }, { value: '2015' }] },
  //     //   ]        
  //     // },
  //     required: true
  //   }]
  // });
  // console.log(products.length);
}
