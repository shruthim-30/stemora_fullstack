const db = require('../config/db');
const { sendAdminEnquiryNotification, sendUserEnquiryConfirmation } = require('../config/mailer');

exports.createEnquiry = async (req, res) => {
  try {
    const body = req.body || {};
    const fields = ['school_name', 'contact_person', 'phone', 'email'];
    const normalized = Object.fromEntries(
      [...fields, 'programme', 'message'].map(key => [
        key,
        typeof body[key] === 'string' ? body[key].trim() : ''
      ])
    );

    if (fields.some(field => !normalized[field])) {
      return res.status(400).json({
        success: false,
        error: 'Please provide all required fields: School Name, Contact Person, Phone, and Email.'
      });
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(normalized.email)) {
      return res.status(400).json({
        success: false,
        error: 'Please provide a valid email address.'
      });
    }

    const maxLengths = {
      school_name: 255,
      contact_person: 255,
      phone: 50,
      email: 255,
      programme: 100,
      message: 10000
    };
    const oversizedField = Object.entries(maxLengths)
      .find(([field, maxLength]) => normalized[field].length > maxLength);
    if (oversizedField) {
      return res.status(400).json({
        success: false,
        error: `${oversizedField[0].replace('_', ' ')} is too long.`
      });
    }

    // Insert into database
    const enquiry = await db.createEnquiry({
      ...normalized,
      email: normalized.email.toLowerCase(),
      programme: normalized.programme || 'Robotics Course'
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
      message: 'Your enquiry has been received. Our STEM team will contact you shortly.',
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
    if (!updated) {
      return res.status(404).json({ success: false, error: 'Enquiry not found.' });
    }
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
