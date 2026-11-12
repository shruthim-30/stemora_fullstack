# Running Stemora in GitHub Codespaces

This repository does not include a `.devcontainer` yet, so Codespaces uses its default Node environment. The Vite and Express servers bind to all interfaces for Codespaces port forwarding.

## Start the application

From the repository root, install the root, server, and client dependencies once:

```bash
npm run setup
```

Then run both services:

```bash
npm run dev
```

Open forwarded port **3000** to view the React website. Vite proxies `/api` and `/uploads` requests to Express on port **5000**. If the port is not forwarded automatically, use the Codespaces **Ports** panel and forward port 3000.

The backend defaults to local JSON storage in `server/database/local_data.json`. To enable the admin panel, configure `ADMIN_USERNAME`, `ADMIN_PASSWORD` (at least 12 characters), and `ADMIN_SESSION_SECRET` (at least 32 bytes) in a local `server/.env` file. Start from [server/.env.example](./server/.env.example), and never commit `.env` values.

## Local checks

- Website: `http://localhost:3000`
- API health: `http://localhost:5000/api/health`
- Public site content: `http://localhost:5000/api/content`
- Contact submissions are written to the configured local database. SMTP notifications are only sent when SMTP variables are configured.

The repository root is a source-code project; GitHub displays its README by default. To see the website, start the dev server and open the forwarded Vite port.
