import * as express from 'express';
import { Product } from '../models/Product';
import { Category } from '../models/Category';
import { Option } from '../models/Option';
import { Filter } from '../models/Filter';
import * as multer from 'multer';
import e = require('express');

const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const upload = multer({ dest: 'uploads/' });
const router = express.Router();

// TODO: 조건 설정 필터 리팩토링 필요 (유틸화), 예외 처리 필요
const convertFilter = (query: any) => {
  let where = {}; // 조건
  let filter = {}; // sub 조건
  let hasFilter = false;
  if (query.filter) {
    let arr: any[] = [];
    let options = JSON.parse(query.filter);
    options.forEach((o: any) => {
      if (o.type === 'RANGE') {
        arr.push({
          [Op.and]: {
            filterId: o.filterId,
            value: { [Op.between]: [o.value.min, o.value.max] }
          }
        });
      } else {
        delete o.type
        arr.push({ [Op.and]: o });
      }
    });
    filter = {
      [Op.or]: arr
    }
    hasFilter = true;
    delete query.filter;
  }
  where = Object.assign(where, query);
  return { where: where, filter: filter, hasFilter: hasFilter }
}

router.get('', async (req, res) => {
  try {
    // 조건 설정
    const { where, filter, hasFilter } = convertFilter(req.query);    
    let products = [];
    // 조회
    if (hasFilter) { // filter 적용
      products = await Product.findAll({
        where: where,
        include: [{
          model: Category,
          attributes: ['title'],
          as: 'category',
        }, {
          model: Option,
          as: 'options',
          where: filter,
          required: true
        }]
      });
    } else {
      products = await Product.findAll({
        where: where,
        include: [{
          model: Category,
          attributes: ['title'],
          as: 'category',
        }]
      });
    }
    res.json({ data: products });
  } catch (e) {    
    return res.status(500).json({ msg: e.message });
  }
});

router.get('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const product = await Product.findByPk(Number(id), {
      include: [{
        model: Category,
        attributes: ['title'],
        as: 'category',
      }, {
        model: Option,
        attributes: ['value'],
        as: 'options',
        include: [{
          model: Filter,
          attributes: ['detail'],
          as: 'filter',
        }]
      }]
    });
    return res.json({ data: product });
  } catch (e) {
    return res.status(500).json({ msg: e.message });
  }
});

router.post('', upload.single('image'), async (req, res) => {
  const image = req.file;
  const product = req.body;
  const options: Option[] = JSON.parse(product.options);

  try {
    // save product 
    const insertedProduct = await Product.create({
      ...product,
      image: `/${image.path}`,
    });
    // save product options
    options.map(i => i.productId = insertedProduct.id);
    await Option.bulkCreate(options);

    return res.json({ data: insertedProduct, msg: '상품등록에 성공하였습니다.' });
  } catch (e) {
    return res.status(500).json({ msg: e.message });
  }
});

export default router;
