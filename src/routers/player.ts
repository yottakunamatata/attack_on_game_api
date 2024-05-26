
import { Router } from 'express';
import { createPlayer, getPlayer, updatePlayer } from '../controllers/player';
import { jwtAuthenticator } from '../middlewares/auth';
import { createPlayerValidator, updatePlayerValidator } from '../validator/playerValidator';

const router = Router();

router.post('/', jwtAuthenticator, createPlayerValidator, createPlayer);
router.get('/:id', jwtAuthenticator, updatePlayerValidator, getPlayer);
router.put('/:id', jwtAuthenticator, updatePlayer);


export default router;

