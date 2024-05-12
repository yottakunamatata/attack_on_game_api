'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const app_1 = __importDefault(require('../app'));
const connectDB_1 = __importDefault(require('../utils/connectDB'));
const user_1 = __importDefault(require('../service/user'));
const PORT = process.env.PORT || 3000;
(0, connectDB_1.default)();
app_1.default.use('/user', user_1.default);
app_1.default.listen(PORT, () => {
  console.log(`你現在收看的是http://localhost:${PORT}`);
});
app_1.default.get('/', (req, res) => {
  res.status(200).json({ message: '莎莎給油!' });
});
