const db = require('../config/db');

exports.getContent = async (req, res) => {
  try {
    const data = await db.getContent();
    return res.json({
      success: true,
      data
    });
  } catch (error) {
    console.error('[GET CONTENT ERROR]', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to fetch content data.'
    });
  }
};

exports.updateStats = async (req, res) => {
  try {
    const { students_trained, sessions_delivered, projects_built, partner_schools } = req.body;
    const updated = await db.updateStats({
      students_trained: students_trained || '2,500+',
      sessions_delivered: sessions_delivered || '450+',
      projects_built: projects_built || '1,800+',
      partner_schools: partner_schools || '35+'
    });
    return res.json({
      success: true,
      message: 'Stats updated successfully.',
      data: updated
    });
  } catch (error) {
    console.error('[UPDATE STATS ERROR]', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to update stats.'
    });
  }
};

exports.updateSettings = async (req, res) => {
  try {
    const updated = await db.updateSettings(req.body);
    return res.json({
      success: true,
      message: 'Site settings updated successfully.',
      data: updated
    });
  } catch (error) {
    console.error('[UPDATE SETTINGS ERROR]', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to update settings.'
    });
  }
};

exports.saveInnovator = async (req, res) => {
  try {
    const item = await db.saveInnovator(req.body);
    return res.json({
      success: true,
      message: 'Innovator saved successfully.',
      data: item
    });
  } catch (error) {
    console.error('[SAVE INNOVATOR ERROR]', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to save innovator.'
    });
  }
};

exports.deleteInnovator = async (req, res) => {
  try {
    const { id } = req.params;
    await db.deleteInnovator(id);
    return res.json({
      success: true,
      message: `Innovator #${id} deleted successfully.`
    });
  } catch (error) {
    console.error('[DELETE INNOVATOR ERROR]', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to delete innovator.'
    });
  }
};
