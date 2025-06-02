import express from 'express';
import { userRoutes } from './http/routes/UserRoutes.js';
import { authRoutes } from './http/routes/authRoutes.js';
import authMiddleware from './http/middlewares/authMiddleware.js';

const app = express();
app.use(express.json());

app.use('/', authRoutes);

app.use(authMiddleware);

app.use('/users', userRoutes);

app.get('/', async (req, res) => {
  res.status(200).json({ ok: 'true' });
});

export default app;
