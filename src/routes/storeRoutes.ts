import { Router } from 'express';
import { findStoresByCep } from '../controllers/storeController';

const router = Router();

// Define a rota usando o handler correto
router.get('/:cep', findStoresByCep);

export default router;
