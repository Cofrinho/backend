import express from 'express';
import { expensesRoutes } from './http/routes/expensesRoutes.js';

const app = express();
app.use(express.json());
app.use('/expenses', expensesRoutes);
app.get('/', async (req, res) => {
  res.status(200).json({ ok: 'true' });
});

export default app;
