# GoDaddy cPanel Deployment Guide for Stemora

This step-by-step guide walks you through deploying the **Stemora Full-Stack Website** (React.js frontend + Node.js/Express backend + MySQL Database + SMTP Mailing) onto **GoDaddy Web Hosting (cPanel)**.

---

## 1. Database Setup in GoDaddy cPanel (MySQL)

GoDaddy cPanel comes with MySQL and phpMyAdmin included at no extra cost.

### Step 1.1: Create MySQL Database & User
1. Log into your **GoDaddy Account** and open **cPanel**.
2. Scroll to the **Databases** section and click **MySQL Database Wizard** (or **MySQL Databases**).
3. **New Database**: Enter database name, e.g. `stemora_db` (Note: cPanel prefixes your username, e.g. `cpaneluser_stemora_db`). Click **Next Step**.
4. **Create Database Users**:
   - Username: e.g. `stemora_user` (will become `cpaneluser_stemora_user`)
   - Password: Click **Password Generator** to create a strong password. **Copy and save this password!**
5. **Add User to Database**:
   - Check the box **ALL PRIVILEGES**.
   - Click **Make Changes**.

### Step 1.2: Import Tables & Initial Content via phpMyAdmin
1. In cPanel, click **phpMyAdmin**.
2. From the left sidebar, click on your newly created database (`cpaneluser_stemora_db`).
3. Click the **Import** tab at the top.
4. Click **Choose File** and select `deploy/database-setup-godaddy.sql` from this project.
5. Click **Go** at the bottom.
6. You will see 5 green checkmarks for `enquiries`, `site_stats`, `innovators`, `testimonials`, and `site_settings`.

---

## 2. Mailing Setup in GoDaddy (cPanel Webmail / SMTP)

Stemora requires email notifications when a school or teacher fills out the enquiry form.

### Step 2.1: Create Your Official Email Account
1. In cPanel, scroll to **Email** and click **Email Accounts**.
2. Click **+ Create**.
3. Choose username: e.g. `contact` or `hello` or `info` (`contact@yourdomain.com`).
4. Set a strong password and save it.
5. Set storage space (e.g. 1024 MB or Unlimited) and click **Create**.

### Step 2.2: Note Your SMTP Connection Details
Click **Connect Devices** or **Check Email** next to the account:
- **Outgoing Server (SMTP)**: `mail.yourdomain.com` (or `localhost` if Node runs on the same server)
- **SMTP Port**: `465` (SSL) or `587` (TLS)
- **Authentication**: Yes (Username = `contact@yourdomain.com`, Password = your email password)

---

## 3. Deploying the Node.js / Express Backend on GoDaddy

GoDaddy cPanel supports Node.js via **"Setup Node.js App"** (powered by Phusion Passenger).

### Step 3.1: Create the Node.js Application in cPanel
1. In cPanel, search for **Setup Node.js App** (under the **Software** section).
2. Click **Create Application**.
3. Configure the settings:
   - **Node.js version**: Select `18.x` or `20.x` (recommended).
   - **Application mode**: `Production`.
   - **Application root**: `stemora-api` (or any folder name outside public_html).
   - **Application URL**: `api` (e.g., `yourdomain.com/api`) or root if serving both.
   - **Application startup file**: `server.js`.
4. Click **Create**.
5. Once created, cPanel will display a command to enter the virtual environment, e.g.:
   `source /home/youruser/nodevenv/stemora-api/20/bin/activate && cd /home/youruser/stemora-api`

### Step 3.2: Upload Server Files
1. Open cPanel **File Manager**.
2. Navigate to the folder you specified as the Application root (`/home/youruser/stemora-api`).
3. Upload the contents of the `server/` directory:
   - `server.js`
   - `package.json`
   - `config/`
   - `controllers/`
   - `routes/`
   - `database/`
   - `uploads/`
   - `.env`
4. In File Manager, right-click `.env` and click **Edit**. Update your production values:
   ```env
   PORT=5000
   NODE_ENV=production

   # GoDaddy MySQL Database
   DB_TYPE=mysql
   DB_HOST=localhost
   DB_PORT=3306
   DB_USER=cpaneluser_stemora_user
   DB_PASSWORD=YourCopiedPasswordHere
   DB_NAME=cpaneluser_stemora_db

   # GoDaddy SMTP Mailing
   SMTP_HOST=mail.yourdomain.com
   SMTP_PORT=465
   SMTP_SECURE=true
   SMTP_USER=contact@yourdomain.com
   SMTP_PASS=YourEmailPasswordHere
   ADMIN_EMAIL=contact@stemora.in
   ```
5. In **Setup Node.js App**, click **Run NPM Install** (or install dependencies via cPanel Terminal).
6. Click **Restart** to launch the Node.js backend.

---

## 4. Deploying the React Frontend Build

### Step 4.1: Build React Locally
On your development machine:
```bash
cd client
npm install
npm run build
```
This generates the optimized production bundle inside `client/dist/`.

### Step 4.2: Upload to `public_html`
1. In cPanel **File Manager**, open `public_html/`.
2. Upload all files from `client/dist/` into `public_html/`:
   - `index.html`
   - `assets/` (CSS, JS bundles)
   - `favicon.ico`
3. Also upload `deploy/.htaccess` directly into `public_html/`.
   - The `.htaccess` file ensures that single-page application (SPA) routing works smoothly and redirects non-file requests to `index.html`.

---

## 5. SSL Certificate & Domain Routing

1. In cPanel, find **SSL/TLS Status**.
2. Select your domain (`yourdomain.com`) and click **Run AutoSSL**.
3. GoDaddy will automatically provision a free Let's Encrypt / cPanel SSL certificate within a few minutes.
4. Your website is now fully live with HTTPS at `https://yourdomain.com`!

---

## 6. Testing Your Live Website

1. **Visit your website**: Check all animations, neo-brutalist buttons, and styling.
2. **Submit a test enquiry**:
   - Scroll to the contact form.
   - Fill in School Name, Contact Person, Phone, and Email.
   - Click **Get in touch**.
   - Check your inbox:
     - Admin will receive the branded alert with all school information.
     - The inquirer will receive the automated confirmation email.
3. **Open the Admin Control Panel**:
   - Click the **⚙️ Admin** button in the navbar.
   - View the test inquiry under **School Enquiries** and update its status.
   - Update live statistics (e.g., student count) and verify it updates in the database immediately.
