import { app } from 'electron';
import path from 'path';
import { createLogger, format, transports } from 'winston';

function formatMessage(info: any) {
  const { level, timestamp } = info;
  let message = info.message;

  if (message === undefined) {
    message = 'undefined';
  }
  if (typeof message !== 'string') {
    message = JSON.stringify(message);
  }
  message = message.replace(/[\r\n]+/g, ' >> ');

  return `${timestamp} <${level}> ${message}`;
}

const formatters = [
  format.align(),
  format.timestamp(),
  format.printf(formatMessage),
];

export const logger = createLogger({
  format: format.combine(...formatters),
  transports: [
    new (transports.File)({
      filename: path.join(app.getPath('userData'), 'logs', 'info.log'),
      level: 'info',
      handleExceptions: true,
    }),
    new (transports.File)({
      filename: path.join(app.getPath('userData'), 'logs', 'debug.log'),
      level: 'debug',
      handleExceptions: true,
    }),
    new (transports.File)({
      filename: path.join(app.getPath('userData'), 'logs', 'error.log'),
      level: 'error',
      handleExceptions: true,
    }),
  ],
});

if (process.env.NODE_ENV !== 'test') {
  formatters.unshift(format.colorize({ message: true, level: true }));

  logger.add(new (transports.Console)({
    level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
    handleExceptions: true,
    format: format.combine(...formatters),
  }));
}

