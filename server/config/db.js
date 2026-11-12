const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const DB_TYPE = process.env.DB_TYPE || (process.env.DB_HOST ? 'mysql' : 'json');
const JSON_DB_FILE = process.env.JSON_DB_FILE || path.join(__dirname, '..', 'database', 'local_data.json');

let pool = null;
let localData = null;

// Initial seed data for fallback JSON mode
const initialData = {
  enquiries: [
    {
      id: 1,
      school_name: "Oakridge International School",
      contact_person: "Priya Nair",
      phone: "+91 98450 12345",
      email: "priya.nair@oakridge.in",
      programme: "RoboCircuit Course",
      message: "We would like to book a demo session for our Grade 6 to 8 students next Tuesday.",
      status: "new",
      created_at: new Date().toISOString()
    }
  ],
  site_stats: {
    id: 1,
    students_trained: "2,500+",
    sessions_delivered: "450+",
    projects_built: "1,800+",
    partner_schools: "35+"
  },
  innovators: [
    {
      id: 1,
      badge: "Innovator of the Month",
      name: "Aarav Sharma",
      project: "Built an Obstacle-Avoiding Smart Rover using ultrasonic sensors and Arduino.",
      grade_school: "Grade 7 · National Public School, Bangalore",
      photo_url: "",
      display_order: 1
    },
    {
      id: 2,
      badge: "Top Builder",
      name: "Diya Rajesh",
      project: "Designed a working robotic arm that sorts colored objects using micro-servos.",
      grade_school: "Grade 6 · Delhi Public School, Bangalore",
      photo_url: "",
      display_order: 2
    },
    {
      id: 3,
      badge: "Creative Thinker",
      name: "Rohan Verma",
      project: "Invented an automated classroom plant-watering system with soil moisture sensors.",
      grade_school: "Grade 8 · Greenwood High, Bangalore",
      photo_url: "",
      display_order: 3
    },
    {
      id: 4,
      badge: "Circuit Star",
      name: "Ananya Kulkarni",
      project: "Mastered integrated circuits and built a light-tracking solar panel prototype.",
      grade_school: "Grade 5 · Bethany High School, Bangalore",
      photo_url: "",
      display_order: 4
    },
    {
      id: 5,
      badge: "Team Leader",
      name: "Kavya & Kabir",
      project: "Led the student team that won 1st Place in the Bangalore Inter-School Roborace.",
      grade_school: "Grade 8 · The Valley School, Bangalore",
      photo_url: "",
      display_order: 5
    },
    {
      id: 6,
      badge: "Rising Coder",
      name: "Siddharth Menon",
      project: "Programmed an AI gesture-controlled LED matrix board in just 4 sessions.",
      grade_school: "Grade 4 · Inventure Academy, Bangalore",
      photo_url: "",
      display_order: 6
    }
  ],
  testimonials: [
    {
      id: 1,
      quote: "Stemora completely transformed how our students engage with science. Watching 6th graders assemble and code their first functional robot was an incredible sight.",
      author_name: "Mrs. Radhika Iyer",
      role_school: "Principal, Greenfield International School",
      rating: 5,
      display_order: 1
    },
    {
      id: 2,
      quote: "My son used to be glued to video games. After attending Stemora’s RoboCircuit workshop, he spent the entire weekend building breadboard circuits and explaining them to us!",
      author_name: "Dr. Arvind Swaminathan",
      role_school: "Parent, Indiranagar",
      rating: 5,
      display_order: 2
    },
    {
      id: 3,
      quote: "The curriculum is exceptionally structured. Their instructors bring all materials, provide hands-on mentorship, and our teachers learned so much alongside the students.",
      author_name: "Mr. Anthony Fernandez",
      role_school: "STEM Department Head, St. Joseph’s Boys’ High School",
      rating: 5,
      display_order: 3
    }
  ],
  site_settings: {
    id: 1,
    phone: "+91 98765 43210",
    email: "contact@stemora.in",
    location: "Indiranagar & HSR Layout, Bangalore",
    summer_dates: "April 10 – May 25, 2027",
    summer_grades: "Grades 3 to 10 (Ages 8-16)",
    summer_venue: "Stemora Innovation Labs, Bangalore"
  }
};

function loadJsonDb() {
  if (fs.existsSync(JSON_DB_FILE)) {
    try {
      localData = JSON.parse(fs.readFileSync(JSON_DB_FILE, 'utf-8'));
    } catch (error) {
      throw new Error(`Could not read JSON database at ${JSON_DB_FILE}: ${error.message}`);
    }
    return;
  }

  localData = JSON.parse(JSON.stringify(initialData));
  saveJsonDb();
}

function saveJsonDb() {
  try {
    fs.writeFileSync(JSON_DB_FILE, JSON.stringify(localData, null, 2), 'utf-8');
  } catch (error) {
    throw new Error(`Could not save JSON database at ${JSON_DB_FILE}: ${error.message}`);
  }
}

async function initDb() {
  if (process.env.NODE_ENV === 'production' && DB_TYPE !== 'mysql') {
    throw new Error('Production requires DB_TYPE=mysql and a configured MySQL connection.');
  }

  if (DB_TYPE === 'mysql') {
    try {
      console.log(`[DB] Attempting MySQL connection to ${process.env.DB_HOST}:${process.env.DB_PORT || 3306}...`);
      pool = mysql.createPool({
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT || '3306'),
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
      });

      // Test connection
      const connection = await pool.getConnection();
      console.log('[DB] Connected to MySQL database successfully.');
      connection.release();
      return { type: 'mysql' };
    } catch (err) {
      const failedPool = pool;
      pool = null;
      if (failedPool) {
        await failedPool.end().catch(closeError => {
          console.error('[DB] Failed to close unavailable MySQL pool:', closeError.message);
        });
      }

      if (process.env.NODE_ENV === 'production') {
        throw new Error(`MySQL connection failed: ${err.message}`);
      }

      console.warn(`[DB] MySQL connection failed (${err.message}). Using local JSON storage in development.`);
      loadJsonDb();
      return { type: 'json' };
    }
  }

  if (DB_TYPE === 'json') {
    console.log('[DB] Using local JSON database.');
    loadJsonDb();
    return { type: 'json' };
  }

  throw new Error(`Unsupported DB_TYPE "${DB_TYPE}". Use "mysql" or "json".`);
}

// Database helper functions supporting both MySQL and JSON storage
const db = {
  init: initDb,

  async healthCheck() {
    if (pool) {
      await pool.query('SELECT 1');
      return { type: 'mysql', status: 'connected' };
    }

    if (!localData) loadJsonDb();
    return { type: 'json', status: 'connected' };
  },

  // --- ENQUIRIES ---
  async createEnquiry({ school_name, contact_person, phone, email, programme, message }) {
    if (pool) {
      const sql = `INSERT INTO enquiries (school_name, contact_person, phone, email, programme, message, status) 
                   VALUES (?, ?, ?, ?, ?, ?, 'new')`;
      const [result] = await pool.execute(sql, [school_name, contact_person, phone, email, programme || 'General Enquiry', message || '']);
      return { id: result.insertId, school_name, contact_person, phone, email, programme, message, status: 'new', created_at: new Date() };
    } else {
      if (!localData) loadJsonDb();
      const newId = localData.enquiries.length > 0 ? Math.max(...localData.enquiries.map(e => e.id)) + 1 : 1;
      const newEnquiry = {
        id: newId,
        school_name,
        contact_person,
        phone,
        email,
        programme: programme || 'General Enquiry',
        message: message || '',
        status: 'new',
        created_at: new Date().toISOString()
      };
      localData.enquiries.unshift(newEnquiry);
      saveJsonDb();
      return newEnquiry;
    }
  },

  async getEnquiries() {
    if (pool) {
      const [rows] = await pool.query('SELECT * FROM enquiries ORDER BY created_at DESC');
      return rows;
    } else {
      if (!localData) loadJsonDb();
      return localData.enquiries;
    }
  },

  async updateEnquiryStatus(id, status) {
    if (pool) {
      const [result] = await pool.execute('UPDATE enquiries SET status = ? WHERE id = ?', [status, id]);
      if (result.affectedRows) return { id, status };
      const [rows] = await pool.execute('SELECT id FROM enquiries WHERE id = ?', [id]);
      return rows.length ? { id, status } : null;
    } else {
      if (!localData) loadJsonDb();
      const item = localData.enquiries.find(e => e.id === parseInt(id));
      if (item) {
        item.status = status;
        saveJsonDb();
      }
      return item;
    }
  },

  // --- CONTENT: STATS, INNOVATORS, TESTIMONIALS, SETTINGS ---
  async getContent() {
    if (pool) {
      const [[stats]] = await pool.query('SELECT * FROM site_stats LIMIT 1');
      const [innovators] = await pool.query('SELECT * FROM innovators ORDER BY display_order ASC, id ASC');
      const [testimonials] = await pool.query('SELECT * FROM testimonials ORDER BY display_order ASC, id ASC');
      const [[settings]] = await pool.query('SELECT * FROM site_settings LIMIT 1');
      return {
        stats: stats || initialData.site_stats,
        innovators: innovators.length ? innovators : initialData.innovators,
        testimonials: testimonials.length ? testimonials : initialData.testimonials,
        settings: settings || initialData.site_settings
      };
    } else {
      if (!localData) loadJsonDb();
      return {
        stats: localData.site_stats,
        innovators: localData.innovators,
        testimonials: localData.testimonials,
        settings: localData.site_settings
      };
    }
  },

  async updateStats(stats) {
    const { students_trained, sessions_delivered, projects_built, partner_schools } = stats;
    if (pool) {
      await pool.execute(
        `UPDATE site_stats SET students_trained = ?, sessions_delivered = ?, projects_built = ?, partner_schools = ? WHERE id = 1`,
        [students_trained, sessions_delivered, projects_built, partner_schools]
      );
      return stats;
    } else {
      if (!localData) loadJsonDb();
      localData.site_stats = { ...localData.site_stats, ...stats };
      saveJsonDb();
      return localData.site_stats;
    }
  },

  async updateSettings(settings) {
    if (pool) {
      const { phone, email, location, summer_dates, summer_grades, summer_venue } = settings;
      await pool.execute(
        `UPDATE site_settings SET phone = ?, email = ?, location = ?, summer_dates = ?, summer_grades = ?, summer_venue = ? WHERE id = 1`,
        [phone, email, location, summer_dates, summer_grades, summer_venue]
      );
      return settings;
    } else {
      if (!localData) loadJsonDb();
      localData.site_settings = { ...localData.site_settings, ...settings };
      saveJsonDb();
      return localData.site_settings;
    }
  },

  async saveInnovator(item) {
    if (pool) {
      if (item.id) {
        await pool.execute(
          `UPDATE innovators SET badge = ?, name = ?, project = ?, grade_school = ?, photo_url = ? WHERE id = ?`,
          [item.badge, item.name, item.project, item.grade_school, item.photo_url || '', item.id]
        );
        return item;
      } else {
        const [res] = await pool.execute(
          `INSERT INTO innovators (badge, name, project, grade_school, photo_url, display_order) VALUES (?, ?, ?, ?, ?, ?)`,
          [item.badge, item.name, item.project, item.grade_school, item.photo_url || '', item.display_order || 0]
        );
        return { ...item, id: res.insertId };
      }
    } else {
      if (!localData) loadJsonDb();
      if (item.id) {
        const idx = localData.innovators.findIndex(i => i.id === parseInt(item.id));
        if (idx !== -1) {
          localData.innovators[idx] = { ...localData.innovators[idx], ...item };
        }
      } else {
        const newId = localData.innovators.length > 0 ? Math.max(...localData.innovators.map(i => i.id)) + 1 : 1;
        item.id = newId;
        localData.innovators.push(item);
      }
      saveJsonDb();
      return item;
    }
  },

  async deleteInnovator(id) {
    if (pool) {
      await pool.execute('DELETE FROM innovators WHERE id = ?', [id]);
      return { success: true };
    } else {
      if (!localData) loadJsonDb();
      localData.innovators = localData.innovators.filter(i => i.id !== parseInt(id));
      saveJsonDb();
      return { success: true };
    }
  }
};

module.exports = db;
