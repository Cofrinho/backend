import express from 'express';
import { userRoutes } from './http/routes/userRoutes.js';
import { groupRoutes } from './http/routes/groupRoutes.js';
import { groupParticipantRoutes } from './http/routes/groupParticipantRoutes.js';
import { authRoutes } from './http/routes/authRoutes.js';
import authMiddleware from './http/middlewares/authMiddleware.js';
import { openFinanceRoutes } from './http/routes/openFinanceRoutes.js';
import { institutionRoutes } from './http/routes/institutionRoutes.js';
import { accountRoutes } from './http/routes/accountRoutes.js';
import { notificationRoutes } from './http/routes/notificationRoutes.js';

const app = express();
app.use(express.json());

app.use('/', authRoutes);

app.use(authMiddleware);

app.use('/users', userRoutes);
app.use('/groups', groupRoutes);
app.use('/participants', groupParticipantRoutes);
app.use('/open-finance', openFinanceRoutes);
app.use('/institutions', institutionRoutes);
app.use('/accounts', accountRoutes);
app.use('/notifications', notificationRoutes);
app.get('/', async (req, res) => {
  res.status(200).json({ ok: 'true' });
});

export default app;
