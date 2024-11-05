// src/config/database.ts
import { Sequelize } from 'sequelize';
import logger from './winston'; // Certifique-se de que o logger está configurado

const sequelize = new Sequelize('physical_store', 'postgres', 'postgres', {
  host: 'localhost',
  dialect: 'postgres',
  logging: (msg) => logger.info(msg), // Usando o logger para registrar as queries
});

export default sequelize;
