import { createWriteStream, existsSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const logsDir = join(__dirname, '../../logs');
if (!existsSync(logsDir)) {
  mkdirSync(logsDir, { recursive: true });
}

const logStream = createWriteStream(join(logsDir, 'app.log'), { flags: 'a' });

const formatLog = (level, message, meta = {}) => {
  const entry = {
    timestamp: new Date().toISOString(),
    level,
    message,
    ...meta,
  };
  return JSON.stringify(entry);
};

const logger = {
  info: (message, meta = {}) => {
    const line = formatLog('INFO', message, meta);
    console.log(`\x1b[36m[INFO]\x1b[0m ${message}`, meta);
    logStream.write(line + '\n');
  },
  warn: (message, meta = {}) => {
    const line = formatLog('WARN', message, meta);
    console.warn(`\x1b[33m[WARN]\x1b[0m ${message}`, meta);
    logStream.write(line + '\n');
  },
  error: (message, meta = {}) => {
    const line = formatLog('ERROR', message, meta);
    console.error(`\x1b[31m[ERROR]\x1b[0m ${message}`, meta);
    logStream.write(line + '\n');
  },
  debug: (message, meta = {}) => {
    if (process.env.NODE_ENV !== 'production') {
      const line = formatLog('DEBUG', message, meta);
      console.log(`\x1b[35m[DEBUG]\x1b[0m ${message}`, meta);
      logStream.write(line + '\n');
    }
  },
};

export default logger;
