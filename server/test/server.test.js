const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { after, before, test } = require('node:test');

const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'stemora-test-'));
const buildDir = path.join(tempDir, 'dist');
const uploadDir = path.join(tempDir, 'uploads');

process.env.NODE_ENV = 'test';
process.env.DB_TYPE = 'json';
process.env.JSON_DB_FILE = path.join(tempDir, 'local_data.json');
process.env.CLIENT_BUILD_DIR = buildDir;
process.env.UPLOAD_DIR = uploadDir;
process.env.ADMIN_USERNAME = 'test-admin';
process.env.ADMIN_PASSWORD = 'test-password-123';
process.env.ADMIN_SESSION_SECRET = 'test-only-session-secret-long-enough-123456';
process.env.SMTP_HOST = '';
process.env.SMTP_USER = '';
process.env.SMTP_PASS = '';
process.env.ADMIN_EMAIL = '';

fs.mkdirSync(path.join(buildDir, 'assets'), { recursive: true });
fs.writeFileSync(path.join(buildDir, 'index.html'), '<!doctype html><div id="root"></div>');
fs.writeFileSync(path.join(buildDir, 'assets', 'app.js'), 'window.stemora = true;');

const db = require('../config/db');
const adminAuth = require('../middleware/adminAuth');
const { app } = require('../server');

let server;
let baseUrl;
let adminCookie;

before(async () => {
  await db.init();
  server = app.listen(0, '127.0.0.1');
  await new Promise(resolve => server.once('listening', resolve));
  baseUrl = `http://127.0.0.1:${server.address().port}`;
});

after(async () => {
  if (server) {
    await new Promise((resolve, reject) => {
      server.close(error => error ? reject(error) : resolve());
    });
  }
  fs.rmSync(tempDir, { recursive: true, force: true });
});

test('health and public content report local database status', async () => {
  const health = await fetch(`${baseUrl}/api/health`);
  assert.equal(health.status, 200);
  assert.deepEqual((await health.json()).database, { type: 'json', status: 'connected' });

  const content = await fetch(`${baseUrl}/api/content`);
  assert.equal(content.status, 200);
  assert.ok((await content.json()).data.stats);
});

test('admin session signatures expire and reject tampering', () => {
  const expired = adminAuth.createSessionToken(Date.now() - 1000);
  assert.equal(adminAuth.isValidSessionToken(expired), false);

  const valid = adminAuth.createSessionToken();
  const tampered = `${valid.slice(0, -1)}${valid.endsWith('a') ? 'b' : 'a'}`;
  assert.equal(adminAuth.isValidSessionToken(tampered), false);
});

test('production cannot start with JSON storage', async () => {
  const previousEnvironment = process.env.NODE_ENV;
  process.env.NODE_ENV = 'production';
  try {
    await assert.rejects(db.init(), /Production requires DB_TYPE=mysql/);
  } finally {
    process.env.NODE_ENV = previousEnvironment;
  }
});

test('missing frontend assets return 404 instead of the SPA document', async () => {
  const root = await fetch(baseUrl);
  assert.match(root.headers.get('content-type'), /text\/html/);

  const directPage = await fetch(`${baseUrl}/programmes`);
  assert.equal(directPage.status, 200);
  assert.match(directPage.headers.get('content-type'), /text\/html/);

  const existingAsset = await fetch(`${baseUrl}/assets/app.js`);
  assert.match(existingAsset.headers.get('content-type'), /javascript/);

  const missingAsset = await fetch(`${baseUrl}/assets/missing.js`);
  assert.equal(missingAsset.status, 404);
  assert.doesNotMatch(missingAsset.headers.get('content-type') || '', /text\/html/);
});

test('admin endpoints require a valid session and allow authenticated operations', async () => {
  const denied = await fetch(`${baseUrl}/api/enquiries`);
  assert.equal(denied.status, 401);

  const badLogin = await fetch(`${baseUrl}/api/admin/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: 'test-admin', password: 'wrong-password' })
  });
  assert.equal(badLogin.status, 401);

  const login = await fetch(`${baseUrl}/api/admin/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: 'test-admin', password: 'test-password-123' })
  });
  assert.equal(login.status, 200);
  adminCookie = login.headers.get('set-cookie').split(';')[0];

  const session = await fetch(`${baseUrl}/api/admin/session`, {
    headers: { Cookie: adminCookie }
  });
  assert.equal(session.status, 200);

  const updatedStats = await fetch(`${baseUrl}/api/content/stats`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', Cookie: adminCookie },
    body: JSON.stringify({
      students_trained: '3,000+',
      sessions_delivered: '500+',
      projects_built: '2,000+',
      partner_schools: '40+'
    })
  });
  assert.equal(updatedStats.status, 200);

  const updatedSettings = await fetch(`${baseUrl}/api/content/settings`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', Cookie: adminCookie },
    body: JSON.stringify({
      phone: '+91 98765 43210',
      email: 'contact@stemora.in',
      location: 'Bangalore',
      summer_dates: 'May 2027',
      summer_grades: 'Grades 3 to 10',
      summer_venue: 'Stemora Lab'
    })
  });
  assert.equal(updatedSettings.status, 200);

  const logout = await fetch(`${baseUrl}/api/admin/logout`, {
    method: 'POST',
    headers: { Cookie: adminCookie }
  });
  assert.equal(logout.status, 200);
  adminCookie = '';

  const deniedAfterLogout = await fetch(`${baseUrl}/api/enquiries`);
  assert.equal(deniedAfterLogout.status, 401);
});

test('enquiries validate input and persist in the isolated JSON database', async () => {
  const invalid = await fetch(`${baseUrl}/api/enquiries`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      school_name: '   ',
      contact_person: 'Test Contact',
      phone: '1234567890',
      email: 'test@example.com'
    })
  });
  assert.equal(invalid.status, 400);

  const submitted = await fetch(`${baseUrl}/api/enquiries`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      school_name: 'Test School',
      contact_person: 'Test Contact',
      phone: '1234567890',
      email: 'TEST@example.com',
      programme: 'Robotics',
      message: 'Please contact our team.'
    })
  });
  assert.equal(submitted.status, 201);
  const enquiry = (await submitted.json()).data;
  assert.equal(enquiry.email, 'test@example.com');

  const login = await fetch(`${baseUrl}/api/admin/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: 'test-admin', password: 'test-password-123' })
  });
  const cookie = login.headers.get('set-cookie').split(';')[0];
  const enquiries = await fetch(`${baseUrl}/api/enquiries`, {
    headers: { Cookie: cookie }
  });
  assert.equal(enquiries.status, 200);
  const savedEnquiries = (await enquiries.json()).data;
  assert.equal(savedEnquiries[0].school_name, 'Test School');

  const statusUpdate = await fetch(`${baseUrl}/api/enquiries/${enquiry.id}/status`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json', Cookie: cookie },
    body: JSON.stringify({ status: 'contacted' })
  });
  assert.equal(statusUpdate.status, 200);
  assert.equal((await statusUpdate.json()).data.status, 'contacted');
});

test('authenticated image uploads are stored and served as images', async () => {
  const deniedUpload = await fetch(`${baseUrl}/api/upload`, { method: 'POST' });
  assert.equal(deniedUpload.status, 401);

  const login = await fetch(`${baseUrl}/api/admin/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: 'test-admin', password: 'test-password-123' })
  });
  const cookie = login.headers.get('set-cookie').split(';')[0];
  const image = fs.readFileSync(path.join(__dirname, '../../client/public/images/1.jpeg'));
  const form = new FormData();
  form.append('photo', new Blob([image], { type: 'image/jpeg' }), 'test.jpg');

  const response = await fetch(`${baseUrl}/api/upload`, {
    method: 'POST',
    headers: { Cookie: cookie },
    body: form
  });
  assert.equal(response.status, 200);
  const uploaded = await response.json();

  const imageResponse = await fetch(`${baseUrl}${uploaded.url}`);
  assert.equal(imageResponse.status, 200);
  assert.match(imageResponse.headers.get('content-type'), /image\/jpeg/);
});
