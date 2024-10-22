import express from 'express';
import storeRoutes from './routes/storeRoutes';
import winston from 'winston';

const app = express();
const port = 3000;

// Configuração do Logger
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'logfile.json' })
  ]
});

app.use(express.json());
app.use('/stores', storeRoutes);

app.listen(port, () => {
  logger.info(`Server is running on http://localhost:${port}`);
});
