const express = require('express');
const adminAuth = require('../middleware/adminAuth');

const router = express.Router();

router.post('/login', adminAuth.loginAdmin);
router.post('/logout', adminAuth.logoutAdmin);
router.get('/session', adminAuth.requireAdmin, (req, res) => {
  res.json({ success: true, data: { authenticated: true } });
});

module.exports = router;
