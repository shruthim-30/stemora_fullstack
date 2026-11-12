const express = require('express');
const router = express.Router();
const contentController = require('../controllers/contentController');
const { requireAdmin } = require('../middleware/adminAuth');

router.get('/', contentController.getContent);
router.put('/stats', requireAdmin, contentController.updateStats);
router.put('/settings', requireAdmin, contentController.updateSettings);
router.post('/innovators', requireAdmin, contentController.saveInnovator);
router.delete('/innovators/:id', requireAdmin, contentController.deleteInnovator);

module.exports = router;
