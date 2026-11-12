const crypto = require('crypto');

const COOKIE_NAME = 'stemora_admin_session';
const SESSION_TTL_SECONDS = 8 * 60 * 60;

function getAdminConfig() {
  return {
    username: process.env.ADMIN_USERNAME || '',
    password: process.env.ADMIN_PASSWORD || '',
    secret: process.env.ADMIN_SESSION_SECRET || ''
  };
}

function assertAdminConfig() {
  const config = getAdminConfig();
  const missing = Object.entries(config)
    .filter(([, value]) => !value)
    .map(([key]) => `ADMIN_${key === 'secret' ? 'SESSION_SECRET' : key.toUpperCase()}`);

  if (missing.length) {
    throw new Error(`Missing required admin environment variables: ${missing.join(', ')}`);
  }

  if (config.password.length < 12 || Buffer.byteLength(config.secret) < 32) {
    throw new Error('ADMIN_PASSWORD must be at least 12 characters and ADMIN_SESSION_SECRET at least 32 bytes.');
  }
}

function safeEqual(value, expected) {
  const valueBuffer = Buffer.from(typeof value === 'string' ? value : '');
  const expectedBuffer = Buffer.from(expected);
  return valueBuffer.length === expectedBuffer.length &&
    crypto.timingSafeEqual(valueBuffer, expectedBuffer);
}

function signatureFor(expiresAt, secret) {
  return crypto.createHmac('sha256', secret).update(String(expiresAt)).digest('base64url');
}

function createSessionToken(expiresAt = Date.now() + SESSION_TTL_SECONDS * 1000) {
  const { secret } = getAdminConfig();
  return `${expiresAt}.${signatureFor(expiresAt, secret)}`;
}

function isValidSessionToken(token) {
  const { secret } = getAdminConfig();
  if (!secret || typeof token !== 'string') return false;

  const [expiresAt, signature, extra] = token.split('.');
  if (!expiresAt || !signature || extra !== undefined) return false;

  const expiry = Number(expiresAt);
  if (!Number.isSafeInteger(expiry) || expiry <= Date.now()) return false;

  const expected = Buffer.from(signatureFor(expiry, secret));
  const actual = Buffer.from(signature);
  return expected.length === actual.length && crypto.timingSafeEqual(expected, actual);
}

function readSessionToken(req) {
  const cookies = (req.headers.cookie || '').split(';');
  const sessionCookie = cookies
    .map(cookie => cookie.trim())
    .find(cookie => cookie.startsWith(`${COOKIE_NAME}=`));

  return sessionCookie ? sessionCookie.slice(COOKIE_NAME.length + 1) : '';
}

function setSessionCookie(res, token, maxAge) {
  const secure = process.env.NODE_ENV === 'production' ? '; Secure' : '';
  res.setHeader(
    'Set-Cookie',
    `${COOKIE_NAME}=${token}; HttpOnly; SameSite=Lax; Path=/; Max-Age=${maxAge}${secure}`
  );
}

function loginAdmin(req, res) {
  try {
    assertAdminConfig();
  } catch (error) {
    return res.status(503).json({ success: false, error: 'Admin authentication is not configured.' });
  }

  const { username, password } = req.body || {};
  const config = getAdminConfig();
  if (
    typeof username !== 'string' || username.length > 256 ||
    typeof password !== 'string' || password.length > 256 ||
    !safeEqual(username, config.username) ||
    !safeEqual(password, config.password)
  ) {
    return res.status(401).json({ success: false, error: 'Invalid admin credentials.' });
  }

  setSessionCookie(res, createSessionToken(), SESSION_TTL_SECONDS);
  return res.json({ success: true, data: { authenticated: true } });
}

function logoutAdmin(req, res) {
  setSessionCookie(res, '', 0);
  return res.json({ success: true });
}

function requireAdmin(req, res, next) {
  const { username, password, secret } = getAdminConfig();
  if (!username || !password || !secret) {
    return res.status(503).json({ success: false, error: 'Admin authentication is not configured.' });
  }

  if (!isValidSessionToken(readSessionToken(req))) {
    return res.status(401).json({ success: false, error: 'Admin authentication required.' });
  }

  return next();
}

module.exports = {
  assertAdminConfig,
  createSessionToken,
  isValidSessionToken,
  loginAdmin,
  logoutAdmin,
  requireAdmin
};
