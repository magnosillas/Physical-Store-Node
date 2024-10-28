import { Router } from 'express';
import { findNearbyStores } from '../controllers/storeController';

const router = Router();

router.post('/stores/nearby', findNearbyStores);

export default router;
    