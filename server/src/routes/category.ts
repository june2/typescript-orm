import * as express from 'express';
import { Category } from '../models/Category';

const router = express.Router();

router.get('', async (req, res) => {
  const categories = await Category.findAll();
  res.json({ data: categories });
});

export default router;
