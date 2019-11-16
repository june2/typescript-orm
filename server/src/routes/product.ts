import * as express from 'express';
import { Product } from '../models/Product';
import { Category } from '../models/Category';
import { Option } from '../models/Option';
import { Filter } from '../models/Filter';
import * as multer from 'multer';

const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const upload = multer({ dest: 'uploads/' });
const router = express.Router();

router.get('', async (req, res) => {
  try {
    // TODO: 조건 설정 필터 리팩토링 필요 (유틸화)
    // 조건 설정
    let where = {};
    let filter = {};
    if (req.query) {
      if (req.query.filter) {
        let arr: any[] = [];
        let temp = JSON.parse(req.query.filter);
        temp.forEach((o: any) => {
          arr.push({ [Op.and]: o });
        });
        filter = {
          [Op.or]: arr
        }
        delete req.query.filter;
      }
      where = Object.assign(where, req.query);
    }
    // 조회
    const products = await Product.findAll({
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
