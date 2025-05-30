import express from 'express';
import { userRoutes } from './http/routes/UserRoutes.js';

const app = express();
app.use(express.json());

app.use('/users', userRoutes);
app.get('/', async (req, res) => {
  res.status(200).json({ ok: 'true' });
});

export default app;
