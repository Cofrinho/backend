import express from 'express';
import { userRoutes } from './http/routes/userRoutes.js';
import { expensesRoutes } from './http/routes/expensesRoutes.js';
import { groupRoutes } from './http/routes/groupRoutes.js';
import { groupParticipantRoutes } from './http/routes/groupParticipantRoutes.js';
import { authRoutes } from './http/routes/authRoutes.js';
import authMiddleware from './http/middlewares/authMiddleware.js';

const app = express();
app.use(express.json());

app.use('/', authRoutes);

app.use(authMiddleware);

app.use('/users', userRoutes);
app.use('/groups', groupRoutes);
app.use('/expenses', expensesRoutes);
app.use('/participants', groupParticipantRoutes);
app.get('/', async (req, res) => {
  res.status(200).json({ ok: 'true' });
});

export default app;
