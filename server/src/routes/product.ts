import * as express from 'express';
import { Product } from '../models/Product';
import { Category } from '../models/Category';
import { Option } from '../models/Option';
import { Filter } from '../models/Filter';
import * as multer from 'multer';

const upload = multer({ dest: 'uploads/' });

const router = express.Router();

router.get('', async (req, res) => {
  // 조건 설정
  let where = {};
  if (req.query) where = Object.assign(where, req.query);
  // 조회
  const products = await Product.findAll({
    where: where,
    include: [{
      model: Category,
      attributes: ['title'],
      as: 'category',
    }]
  });
  res.json({ data: products });
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

  try {
    const insertedProduct = await Product.create({
      ...product,
      image: `/${image.path}`,
    });
    return res.json({ data: insertedProduct, msg: '상품등록에 성공하였습니다.' });
  } catch (e) {
    return res.status(500).json({ msg: e.message });
  }
});

export default router;
