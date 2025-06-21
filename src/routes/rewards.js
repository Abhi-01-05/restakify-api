import express from 'express';
import { getRewards } from '../services/fetchData.js';
const router = express.Router();

router.get('/:address', async (req, res) => {
  const { address } = req.params;
  const data = await getRewards(address);
  res.json(data);
});

export default router;