# Stemora – Lighting Young Minds (Full-Stack Dynamic Platform)

A full-stack, responsive, and dynamic web application for **Stemora**, built from scratch with **React.js**, **Node.js**, **Express**, **Tailwind CSS**, and **MySQL/SQLite database** with automated **SMTP mailing** and **photo upload capabilities**.

Designed with Stemora's playful retro-modern STEM branding (navy `#0D2136`, teal `#1FAFA9`, gold `#F2AA1F`, neo-brutalist borders, card drop shadows, and interactive progress widgets).

---

## 🌟 What Makes This Website Dynamic?

1. **Active School Demo & Programme Enquiry System**:
   - Live form submission from teachers, principals, and coordinators.
   - Saves enquiries directly into the MySQL database with timestamps and status tracking (`new`, `in_progress`, `contacted`, `closed`).
   - Automatically sends:
     - **Admin Notification Email** to the Stemora management team with full school details.
     - **Confirmation Receipt Email** to the school with personalized Stemora branding.

2. **Live Editable Statistics & Metrics**:
   - The stats in the *Achievements* section (`Students trained`, `Sessions delivered`, `Projects built`, `Partner schools`) are not hardcoded.
   - They load dynamically from the database and can be edited anytime through the built-in Admin panel.

3. **Interactive Photo Placeholders & Uploads**:
   - All photo placeholder slots (Hero showcase, About team, Gallery, Wall of Innovators, Summer camp) support **one-click image selection & upload**.
   - Backed by an Express `multer` image processing API with local storage in `/uploads`.

4. **Built-in Admin Control Panel Modal**:
   - Accessible via the **⚙️ Admin** button in the navbar and footer.
   - **Enquiry Manager**: View submissions, contact details, date/time, and update lead statuses.
   - **Live Statistics Editor**: Update numbers without modifying or redeploying code.
   - **Settings & Summer Camp Manager**: Update phone, email, Bangalore campus locations, and Summer 2027 camp dates.

---

## 💡 Database & Mailing Recommendations for GoDaddy

### 1. Database: Which Database Should You Use?
- **Recommended: MySQL (Included Free in GoDaddy cPanel)**:
  - GoDaddy Web Hosting includes **unlimited MySQL databases** managed via **phpMyAdmin**.
  - We have included `deploy/database-setup-godaddy.sql` which creates all tables and seeds default data in one click.
  - The backend uses `mysql2/promise` with a connection pool for fast querying.
- **Local / Zero-Config Mode**:
  - The backend includes an automated fallback to a local JSON database (`server/database/local_data.json`). If MySQL is not running on your local machine, the application still runs 100% smoothly without crashing!

### 2. Mailing: What Should You Use for Emails?
- **Option 1: GoDaddy cPanel Webmail / SMTP (Recommended for GoDaddy)**:
  - Create an email account in cPanel (e.g., `contact@yourdomain.com`).
  - Use GoDaddy's SMTP server (`mail.yourdomain.com` or `localhost`, port `465` or `587`).
  - Cost: Free (included with your GoDaddy hosting).
- **Option 2: Transactional Email API (Brevo / Resend / SendGrid)**:
  - If you want guaranteed deliverability to prevent spam filtering, you can use **Resend** (3,000 free emails/month) or **Brevo** (300 free emails/day).
  - Just paste their SMTP host, user, and API key into `server/.env`.
- **Option 3: Microsoft 365 through GoDaddy**:
  - If your domain email is managed by GoDaddy's Microsoft 365, use `smtp.office365.com`, port `587`, TLS.

---

## 📁 Project Architecture

```
stemora-fullstack/
├── client/                           # React.js + Tailwind CSS Frontend
│   ├── public/
│   ├── src/
│   │   ├── components/               # React UI Components
│   │   │   ├── Navbar.jsx            # Sticky Navigation + Hamburger Menu
│   │   │   ├── Hero.jsx              # Hero section + 3 Photo Showcases
│   │   │   ├── TickerTape.jsx        # Navy & Gold Ticker Banner
│   │   │   ├── About.jsx             # About Us + Mission & Vision Cards
│   │   │   ├── Programmes.jsx        # 3 Programmes (Robotics, RoboCircuit, Festival)
│   │   │   ├── WhyStemora.jsx        # Teal Checklist Section
│   │   │   ├── HowItWorks.jsx        # 4-Step Vertical Timeline
│   │   │   ├── Achievements.jsx      # Dynamic Stats & 6-Image Gallery
│   │   │   ├── SummerChamp.jsx       # Gold Tone Summer Camp 2027 Section
│   │   │   ├── OnlinePlatform.jsx    # Online Platform & Live Learning Widget
│   │   │   ├── WallOfInnovators.jsx  # 6 Innovator of the Month Cards
│   │   │   ├── Testimonials.jsx      # 5-Star Testimonial Cards
│   │   │   ├── RoboticsFestival.jsx  # Navy Festival Banner
│   │   │   ├── ContactSection.jsx    # School Demo Enquiry Form
│   │   │   ├── Footer.jsx            # Footer with brand & navigation
│   │   │   ├── PhotoPlaceholder.jsx  # Interactive Photo Upload Component
│   │   │   └── AdminModal.jsx        # Admin Dashboard for Enquiries & Content
│   │   ├── data/
│   │   │   └── defaultContent.js     # Default Seed Data & Placeholders
│   │   ├── services/
│   │   │   └── api.js                # Frontend REST API client
│   │   ├── App.jsx                   # Master Application Layout
│   │   ├── index.css                 # Neo-brutalist styles & grid pattern
│   │   └── main.jsx
│   ├── package.json
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── vite.config.js
│
├── server/                           # Node.js + Express Backend
│   ├── config/
│   │   ├── db.js                     # Unified MySQL & JSON database manager
│   │   └── mailer.js                 # Nodemailer with HTML templates
│   ├── controllers/
│   │   ├── enquiryController.js      # Handles demo inquiries & email triggers
│   │   └── contentController.js      # Handles dynamic stats & settings
│   ├── routes/
│   │   ├── enquiryRoutes.js          # /api/enquiries endpoints
│   │   ├── contentRoutes.js          # /api/content endpoints
│   │   └── uploadRoutes.js           # /api/upload photo upload handler
│   ├── database/
│   │   ├── schema.sql                # MySQL Schema for phpMyAdmin
│   │   └── initDb.js                 # Automatic MySQL Table Initializer
│   ├── uploads/                      # Uploaded images directory
│   ├── .env.example                  # Environment template
│   ├── .env                          # Active server configuration
│   ├── package.json
│   └── server.js                     # Main Express server entry point
│
├── deploy/                           # Deployment Suite for GoDaddy
│   ├── godaddy-cpanel-guide.md       # Comprehensive step-by-step GoDaddy guide
│   ├── database-setup-godaddy.sql    # 1-Click MySQL database dump
│   └── .htaccess                     # Apache SPA rewrite & caching rules
│
├── package.json                      # Monorepo scripts
└── README.md
```

---

## 🚀 Quick Start (Running Locally)

### Prerequisites
Make sure **Node.js** (v18 or higher) and **npm** are installed on your computer.

### Step 1: Start the Backend (Server)
```bash
cd stemora-fullstack/server
npm install
npm run dev
```
The server will start on `http://localhost:5000`:
- `GET http://localhost:5000/api/health` -> Health check
- `GET http://localhost:5000/api/content` -> Dynamic content (stats, innovators, settings)

### Step 2: Start the Frontend (Client)
In a new terminal window:
```bash
cd stemora-fullstack/client
npm install
npm run dev
```
Open your browser and navigate to `http://localhost:3000` (or the port displayed in your terminal).

---

## 📬 API Reference

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/enquiries` | Submit a new school demo inquiry (triggers email notification) |
| `GET` | `/api/enquiries` | Retrieve all submitted inquiries (Admin) |
| `PATCH` | `/api/enquiries/:id/status` | Update inquiry status (`new`, `in_progress`, `contacted`, `closed`) |
| `GET` | `/api/content` | Fetch live site stats, innovators, testimonials, and settings |
| `PUT` | `/api/content/stats` | Update site statistics in database |
| `PUT` | `/api/content/settings` | Update contact phone/email/location/summer camp details |
| `POST` | `/api/upload` | Upload image file (multipart/form-data) |
| `GET` | `/api/health` | Server uptime & status check |

---

## 🚢 Deploying to GoDaddy

Refer to the complete walkthrough in [`deploy/godaddy-cpanel-guide.md`](./deploy/godaddy-cpanel-guide.md):
1. **Database**: Create MySQL database in GoDaddy cPanel and import `deploy/database-setup-godaddy.sql`.
2. **Backend**: Upload `server/` to cPanel via **Setup Node.js App** and configure `.env`.
3. **Frontend**: Run `npm run build` inside `client/` and upload `dist/` + `.htaccess` to `public_html/`.
4. **Mailing**: Create an email account in cPanel Email Accounts and update `SMTP_USER` and `SMTP_PASS` in `.env`.
