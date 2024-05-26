
import { Router } from 'express';
import { createPlayer, getPlayer, updatePlayer } from '../controllers/player';
import { jwtAuthenticator } from '../middlewares/auth';

const router = Router();

router.post('/', jwtAuthenticator, createPlayer);
router.get('/:id', jwtAuthenticator, getPlayer);
router.put('/:id', jwtAuthenticator, updatePlayer);


export default router;

