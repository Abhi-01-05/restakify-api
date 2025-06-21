import express from 'express';
import { getValidators } from '../services/fetchData.js';
const router = express.Router();

router.get('/', async (req, res) => {
  const data = await getValidators();
  res.json(data);
});

export default router;