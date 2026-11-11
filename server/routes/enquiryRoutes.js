const express = require('express');
const router = express.Router();
const enquiryController = require('../controllers/enquiryController');

router.post('/', enquiryController.createEnquiry);
router.get('/', enquiryController.getEnquiries);
router.patch('/:id/status', enquiryController.updateStatus);

module.exports = router;
