"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const generateJWT_1 = __importDefault(require("../middlewares/generateJWT"));
const auth_1 = require("../middlewares/auth");
const user_1 = __importDefault(require("./user"));
const router = (0, express_1.Router)();
router.use('/user', user_1.default);
router.post('/login', auth_1.localAuthenticator, generateJWT_1.default);
router.get('/profile', auth_1.jwtAuthenticator, (req, res) => {
    res.status(200).json({ user: req.user });
});
exports.default = router;