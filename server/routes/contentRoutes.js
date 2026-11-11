const express = require('express');
const router = express.Router();
const contentController = require('../controllers/contentController');

router.get('/', contentController.getContent);
router.put('/stats', contentController.updateStats);
router.put('/settings', contentController.updateSettings);
router.post('/innovators', contentController.saveInnovator);
router.delete('/innovators/:id', contentController.deleteInnovator);

module.exports = router;
