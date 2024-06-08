<<<<<<< HEAD
'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const express_1 = __importDefault(require('express'));
const cors_1 = __importDefault(require('cors'));
const mongoose_1 = __importDefault(require('mongoose'));
const storeRouter_1 = __importDefault(require('./routes/storeRouter'));
const dotenv = require('dotenv');
dotenv.config({ path: '.env' });
console.log(process.env.dbName);
const DB = `mongodb+srv://${process.env.dbUserName}:${process.env.dbPassword}@cluster0.2jethgx.mongodb.net/${process.env.dbName}?retryWrites=true&w=majority&appName=Cluster0`;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
mongoose_1.default
  .connect(DB)
  .then(() => {
    console.log('MongoDB Atlas資料庫連線成功');
  })
  .catch((error) => {
    console.log(error);
  });
app.use('/api', storeRouter_1.default);
=======
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
require("module-alias/register");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use((0, cors_1.default)());
>>>>>>> de76f4dfb689dc96a81221a2a27bc71c0e13fcba
exports.default = app;
