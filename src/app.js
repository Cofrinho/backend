import express from 'express';
import { userRoutes } from './http/routes/userRoutes.js';
import { groupRoutes } from './http/routes/groupRoutes.js';
import { groupParticipantRoutes } from './http/routes/groupParticipantRoutes.js';

const app = express();
app.use(express.json());

app.use('/users', userRoutes);
app.use('/groups', groupRoutes);
app.use('/participants', groupParticipantRoutes);

app.get('/', async (req, res) => {
  res.status(200).json({ ok: 'true' });
});

export default app;
