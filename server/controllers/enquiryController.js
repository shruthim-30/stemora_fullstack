const db = require('../config/db');
const { sendAdminEnquiryNotification, sendUserEnquiryConfirmation } = require('../config/mailer');

exports.createEnquiry = async (req, res) => {
  try {
    const { school_name, contact_person, phone, email, programme, message } = req.body;

    // Validation
    if (!school_name || !contact_person || !phone || !email) {
      return res.status(400).json({
        success: false,
        error: 'Please provide all required fields: School Name, Contact Person, Phone, and Email.'
      });
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        error: 'Please provide a valid email address.'
      });
    }

    // Insert into database
    const enquiry = await db.createEnquiry({
      school_name: school_name.trim(),
      contact_person: contact_person.trim(),
      phone: phone.trim(),
      email: email.trim().toLowerCase(),
      programme: programme ? programme.trim() : 'Robotics Course',
      message: message ? message.trim() : ''
    });

    // Trigger emails asynchronously so user response is fast
    Promise.allSettled([
      sendAdminEnquiryNotification(enquiry),
      sendUserEnquiryConfirmation(enquiry)
    ]).then(results => {
      console.log('[ENQUIRY] Email triggers completed:', results.map(r => r.status));
    }).catch(err => {
      console.error('[ENQUIRY] Email trigger error:', err);
    });

    return res.status(201).json({
      success: true,
      message: 'Your enquiry has been received! Our STEM team will contact you shortly.',
      data: enquiry
    });
  } catch (error) {
    console.error('[ENQUIRY ERROR]', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to process enquiry. Please try again or contact us directly.'
    });
  }
};

exports.getEnquiries = async (req, res) => {
  try {
    const list = await db.getEnquiries();
    return res.json({
      success: true,
      data: list
    });
  } catch (error) {
    console.error('[GET ENQUIRIES ERROR]', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to fetch enquiries.'
    });
  }
};

exports.updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const validStatuses = ['new', 'in_progress', 'contacted', 'closed'];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        error: `Status must be one of: ${validStatuses.join(', ')}`
      });
    }

    const updated = await db.updateEnquiryStatus(id, status);
    return res.json({
      success: true,
      message: `Enquiry #${id} status updated to ${status}`,
      data: updated
    });
  } catch (error) {
    console.error('[UPDATE ENQUIRY STATUS ERROR]', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to update enquiry status.'
    });
  }
};
