import express from 'express';
import { getRestakers } from '../services/fetchData.js';
const router = express.Router();

router.get('/', async (req, res) => {
  const data = await getRestakers();
  res.json(data);
});

export default router;