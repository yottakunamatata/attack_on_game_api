"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const player_1 = require("../controllers/player");
<<<<<<< HEAD
const auth_1 = require("../middlewares/auth");
const playerValidator_1 = require("../validator/playerValidator");
const router = (0, express_1.Router)();
router.post('/', auth_1.jwtAuthenticator, playerValidator_1.createPlayerValidator, player_1.createPlayer);
router.get('/:id', auth_1.jwtAuthenticator, player_1.getPlayer);
router.put('/:id', auth_1.jwtAuthenticator, playerValidator_1.updatePlayerValidator, player_1.updatePlayer);
exports.default = router;
=======
const playerValidator_1 = require("../validators/playerValidator");
const router = (0, express_1.Router)();
router.post('/', playerValidator_1.createPlayerValidator, player_1.createPlayer);
router.get('/:id', player_1.getPlayer);
router.patch('/:id', playerValidator_1.updatePlayerValidator, player_1.updatePlayer);
exports.default = router;
//# sourceMappingURL=player.js.map
>>>>>>> 9c0ef4d91614811860ae2341df7b19239d8f626e
