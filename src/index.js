import express from 'express';
import dotenv from 'dotenv';
import restakerRoutes from './routes/restakers.js';
import validatorRoutes from './routes/validators.js';
import rewardRoutes from './routes/rewards.js';

dotenv.config();
const app = express();
app.use(express.json());

app.use('/restakers', restakerRoutes);
app.use('/validators', validatorRoutes);
app.use('/rewards', rewardRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
