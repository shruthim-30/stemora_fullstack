# GoDaddy cPanel deployment guide

This project is configured for a **single Node.js application at the domain root**. Express serves the Vite build and the `/api` endpoints from the same origin. This avoids separate CORS and Apache rewrite rules. GoDaddy Node.js application availability and root-domain mapping vary by hosting plan; confirm that cPanel can map the app to `stemora.in` before changing the current live deployment.

No DNS or GoDaddy account changes are made by this repository.

## 1. Prepare the MySQL database

1. In cPanel, create a MySQL database and user, then grant the user the required privileges.
2. Record the full cPanel-prefixed database and username.
3. In phpMyAdmin, select that database and import `deploy/database-setup-godaddy.sql`.
4. Confirm the five application tables exist: `enquiries`, `site_stats`, `innovators`, `testimonials`, and `site_settings`.

The SQL file creates tables and seed rows in the selected database; it does not create or select the cPanel database for you. Do not re-import into a database containing production content unless you have reviewed the seed behavior and made a backup.

## 2. Build and upload the application

1. From the repository root, run:

   ```bash
   npm run setup
   npm run build
   ```

   The production React build is generated in `client/dist/`. The build script also installs the server's production dependencies.
2. In cPanel **Setup Node.js App**, create a Node.js 18+ application in `Production` mode. Set its application root to a folder outside `public_html` that contains the project layout:

   ```text
   application-root/
   ├── client/dist/
   └── server/
       ├── server.js
       ├── package.json
       └── ...
   ```

3. Configure the application URL to the domain root (`stemora.in`) and its startup file to `server/server.js`. Do **not** mount it at `/api`: the Express routes already include the `/api` prefix.
4. Upload the built `client/dist/`, `server/`, and required project files. Do not upload `.git/`, `node_modules/`, or any local `.env` file.
5. Install production dependencies in cPanel's app environment (or its terminal):

   ```bash
   npm install --prefix server --omit=dev
   ```

Express serves the Vite build from the sibling `client/dist/` folder. This is why uploading only the contents of `server/` is insufficient.

## 3. Configure environment variables in cPanel

Use the Node.js application's environment-variable settings. Do not commit credentials or paste them into documentation. Required production variables:

```text
NODE_ENV=production
DB_TYPE=mysql
DB_HOST=<GoDaddy database host>
DB_PORT=3306
DB_USER=<full cPanel database username>
DB_PASSWORD=<database password>
DB_NAME=<full cPanel database name>
ADMIN_USERNAME=<admin login name>
ADMIN_PASSWORD=<unique password, at least 12 characters>
ADMIN_SESSION_SECRET=<random secret, at least 32 bytes>
```

Do not set `PORT` manually; Express listens on the port assigned by the hosting platform. Production startup fails if the MySQL connection, admin credentials, or frontend build is missing rather than silently using local JSON.

Optional variables:

```text
UPLOAD_DIR=<persistent writable upload directory>
SMTP_HOST=<SMTP server>
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=<SMTP username>
SMTP_PASS=<SMTP password>
ADMIN_EMAIL=<notification recipient>
```

Uploaded images are served from `/uploads`. Ensure `UPLOAD_DIR` is writable by the Node application and persists across app restarts/deployments. Email notifications are only sent when SMTP is configured; form storage does not depend on SMTP.

## 4. Start and verify the app

Restart the Node.js application from cPanel, then check:

```text
https://stemora.in/
https://stemora.in/api/health
https://stemora.in/api/content
```

The health response should include `database: { type: "mysql", status: "connected" }`. In browser developer tools, verify the referenced JavaScript and CSS assets return successful responses with JavaScript and CSS MIME types. A missing asset should return 404, not the SPA HTML.

Test a direct page refresh on any client-side path. This app is a single-page site; Express returns `index.html` for HTML navigation requests and serves existing static files separately. No `deploy/.htaccess` is required for this single-app layout.

## 5. Safe feature verification

Use a staging app or an agreed test database/account for write tests:

- Submit a clearly identified test enquiry and verify its database row and configured email notifications.
- Sign in through **Admin** and verify enquiry status, stats, and contact settings changes.
- Upload a test image and verify its `/uploads/...` URL remains available after restart.
- Verify invalid form fields are rejected and unauthenticated admin API requests return 401.

Do not use production for test submissions or edits unless you have approved the test data and cleanup. Live health/content GET requests are read-only; they do not prove that admin writes, SMTP, uploads, or database persistence work.

## 6. HTTPS and domain

Confirm the domain has a valid HTTPS certificate in cPanel and that the Node application is mapped to the intended domain root. The application uses same-origin API URLs, so the website and API should remain on the same HTTPS origin. Do not alter DNS records as part of this deployment guide.
