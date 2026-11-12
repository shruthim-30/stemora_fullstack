const express = require('express');
const router = express.Router();
const enquiryController = require('../controllers/enquiryController');
const { requireAdmin } = require('../middleware/adminAuth');

router.post('/', enquiryController.createEnquiry);
router.get('/', requireAdmin, enquiryController.getEnquiries);
router.patch('/:id/status', requireAdmin, enquiryController.updateStatus);

module.exports = router;
