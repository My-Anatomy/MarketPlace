import express from 'express';
const router = express.Router();

router.post('/login', (req, res) => {
  res.json({ success: true, token: 'dummy-token' });
});

//git add .
//git commit -m " "
//git push origin main

export default router;