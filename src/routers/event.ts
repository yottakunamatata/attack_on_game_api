import { Router } from 'express';
import { EventController } from '@/controllers/eventController';
import { handleValidationErrors } from '@/middlewares/handleValidationErrors';
import { EventValidator } from '@/validators/eventValidator';
const router = Router();
router.post(
  '/',
  EventValidator,
  handleValidationErrors,
  EventController.createEvent,
);
export default router;
