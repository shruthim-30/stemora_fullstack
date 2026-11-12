# Stemora – Lighting Young Minds (Full-Stack Dynamic Platform)

A full-stack, responsive, and dynamic web application for **Stemora**, built with **React**, **Vite**, **Node.js**, **Express**, **Tailwind CSS**, and MySQL (with local JSON storage for development), plus optional SMTP email and photo uploads.

Designed with Stemora's playful retro-modern STEM branding (navy `#0D2136`, teal `#1FAFA9`, gold `#F2AA1F`, neo-brutalist borders, card drop shadows, and interactive progress widgets).

---

## 🌟 What Makes This Website Dynamic?

1. **Active School Demo & Programme Enquiry System**:
   - Live form submission from teachers, principals, and coordinators.
   - Saves enquiries directly into the MySQL database with timestamps and status tracking (`new`, `in_progress`, `contacted`, `closed`).
   - Sends email when SMTP is configured:
     - **Admin Notification Email** to the Stemora management team with full school details.
     - **Confirmation Receipt Email** to the school with personalized Stemora branding.

2. **Live Editable Statistics & Metrics**:
   - The stats in the *Achievements* section (`Students trained`, `Sessions delivered`, `Projects built`, `Partner schools`) are not hardcoded.
   - They load dynamically from the database and can be edited anytime through the built-in Admin panel.

3. **Interactive Photo Placeholders & Uploads**:
   - Authenticated admins can upload student photos from the Wall of Innovators.
   - Backed by an Express `multer` upload API; set `UPLOAD_DIR` to a persistent writable folder in production.

4. **Built-in Admin Control Panel Modal**:
   - Accessible via **Admin** in the navbar or footer. Configure an admin username, password, and session secret in environment variables; there are no committed default credentials.
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
  - Local development defaults to JSON storage in `server/database/local_data.json`. Set `DB_TYPE=mysql` to use MySQL locally. A MySQL failure in production stops startup instead of appearing healthy while saving elsewhere.

### 2. Mailing: What Should You Use for Emails?
- **Option 1: GoDaddy cPanel Webmail / SMTP (Recommended for GoDaddy)**:
  - Create an email account in cPanel (e.g., `contact@yourdomain.com`).
  - Use GoDaddy's SMTP server (`mail.yourdomain.com` or `localhost`, port `465` or `587`).
  - Cost: Free (included with your GoDaddy hosting).
- **Option 2: Transactional Email API (Brevo / Resend / SendGrid)**:
  - If you want guaranteed deliverability to prevent spam filtering, you can use **Resend** (3,000 free emails/month) or **Brevo** (300 free emails/day).
  - Set their SMTP host, user, and API key in local environment variables or GoDaddy's Node.js app environment settings; never commit credentials.
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
│   ├── middleware/adminAuth.js       # Signed admin session authentication
│   ├── routes/adminRoutes.js         # Admin login/logout/session
│   ├── .env.example                  # Safe environment template
│   ├── package.json
│   └── server.js                     # Main Express server entry point
│
├── deploy/                           # Deployment Suite for GoDaddy
│   ├── godaddy-cpanel-guide.md       # Comprehensive step-by-step GoDaddy guide
│   ├── database-setup-godaddy.sql    # 1-Click MySQL database dump
│
├── package.json                      # Monorepo scripts
└── README.md
```

---

## 🚀 Quick Start (Running Locally)

### Prerequisites
Make sure **Node.js** (v18 or higher) and **npm** are installed on your computer.

### Start the complete application
```bash
npm run setup
npm run dev
```
Open `http://localhost:3000`. Vite proxies `/api` and `/uploads` to Express on port 5000. The backend uses local JSON storage unless MySQL is configured.

To enable the admin panel locally, set `ADMIN_USERNAME`, `ADMIN_PASSWORD` (12+ characters), and `ADMIN_SESSION_SECRET` (32+ bytes) in `server/.env`; see [server/.env.example](./server/.env.example). Do not commit `server/.env`.

---

## 📬 API Reference

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/enquiries` | Submit a new school demo inquiry (triggers email notification) |
| `POST` | `/api/admin/login` | Sign in using environment-configured admin credentials |
| `GET` | `/api/admin/session` | Check the current admin session |
| `POST` | `/api/admin/logout` | End the current admin session |
| `GET` | `/api/enquiries` | Retrieve inquiries (admin session required) |
| `PATCH` | `/api/enquiries/:id/status` | Update inquiry status (admin session required) |
| `GET` | `/api/content` | Fetch live site stats, innovators, testimonials, and settings |
| `PUT` | `/api/content/stats` | Update site statistics (admin session required) |
| `PUT` | `/api/content/settings` | Update contact and summer camp details (admin session required) |
| `POST` | `/api/upload` | Upload image (admin session required, multipart/form-data) |
| `GET` | `/api/health` | Server and database connectivity check |

---

## 🚢 Deploying to GoDaddy

Refer to the complete walkthrough in [`deploy/godaddy-cpanel-guide.md`](./deploy/godaddy-cpanel-guide.md):
1. **Database**: Create MySQL database in GoDaddy cPanel and import `deploy/database-setup-godaddy.sql`.
2. **Application**: Configure one Node.js app at the domain root, upload the project with `client/dist/` alongside `server/`, and set production environment variables in cPanel.
3. **Build**: Run `npm run build` from the project root; Express serves `client/dist/` and same-origin `/api` routes.
4. **Secrets and uploads**: Configure database, admin, optional SMTP, and a persistent `UPLOAD_DIR` using cPanel's environment settings. Do not upload or commit a local `.env`.
