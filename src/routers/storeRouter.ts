import express from 'express';
import { storValidationRule } from '../validators/storeValidator';
import { validateFileds } from '../middlewares/validateFileds';
import { allowedFileds } from '../validators/storeValidator';
import {
  createStore,
  getStores,
  getStoreById,
  updateStore,
  deleteStore,
} from '../controllers/storeController';
import { jwtAuthenticator } from '../middlewares/auth';

const router = express.Router();

router.post('/', jwtAuthenticator, createStore);
router.get('/', getStores);
router.get('/:id', getStoreById);
router.patch(
  '/:id',
  validateFileds(allowedFileds),
  storValidationRule,
  updateStore,
);

// 待更新
router.delete('/:id', deleteStore);

export default router;
