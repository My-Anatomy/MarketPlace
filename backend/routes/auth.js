import express from 'express';
const router = express.Router();

router.post('/login', (req, res) => {
  res.json({ success: true, token: 'dummy-token' });
});

export default router;
