// src/config/winston.ts

import { createLogger, format, transports } from 'winston';
import fs from 'fs';
import path from 'path';

// Define o caminho para o diretório de logs
const logDirectory = path.resolve(__dirname, '../../logs');

// Verifica se o diretório existe, caso contrário, cria
if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory, { recursive: true });
}

const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp(),
    format.json()
  ),
  transports: [
    new transports.File({ filename: path.join(logDirectory, 'error.log'), level: 'error' }),
    new transports.File({ filename: path.join(logDirectory, 'combined.log') }),
    // Adiciona o transporte Console para facilitar a depuração
    new transports.Console({
      format: format.combine(
        format.colorize(),
        format.simple()
      )
    })
  ]
});

export default logger;
