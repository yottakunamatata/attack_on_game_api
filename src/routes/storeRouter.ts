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

const router = express.Router();

// create店家資料(假資料)
router.post('/createStrore', createStore);

// GET - 獲取所有店家資料
router.get('/v1/stores', getStores);

// GET - 獲取單一店家資料
router.get('/v1/store/:id', getStoreById);

// PATCH - 修改店家資料(含驗證)
router.patch(
  '/v1/store/:id',
  validateFileds(allowedFileds),
  storValidationRule,
  updateStore,
);

// DELETE - 刪除單一店家資料
router.delete('/v1/store/:id', deleteStore);

export default router;
