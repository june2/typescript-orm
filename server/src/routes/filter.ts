import * as express from 'express';
import { Filter } from '../models/Filter';
import { FilterItem } from '../models/FilterItem';

const router = express.Router();

router.get('/:id', async (req, res) => {
  let categoryId = req.params.id;
  const filter = await Filter.findAll({
    attributes: ['id', 'type', 'title', 'desc', 'detail'],
    where: {
      categoryId: categoryId
    },
    include: [{
      model: FilterItem,
      attributes: ['title', 'desc', 'value'],
      as: 'items',
    }]
  })
  res.json({ data: filter });
});

export default router;
