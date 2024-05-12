'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const express_1 = require('express');
const passport_1 = __importDefault(require('../config/passport'));
const generateJWT_1 = __importDefault(require('../middlewares/generateJWT'));
const router = (0, express_1.Router)();
router.post(
  '/login',
  passport_1.default.authenticate('local', { session: false }),
  generateJWT_1.default,
);
router.get(
  '/profile',
  passport_1.default.authenticate('jwt', { session: false }),
  (req, res) => {
    res.json(req.user);
  },
);
exports.default = router;
