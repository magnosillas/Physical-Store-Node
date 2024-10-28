import express from 'express';
import storeRoutes from './routes/storeRoutes';
import logger from './config/winston';

const app = express();
app.use(express.json());

app.use('/', storeRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  logger.info(`Servidor iniciado na porta ${PORT}`);
});
