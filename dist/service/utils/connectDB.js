'use strict';
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
Object.defineProperty(exports, '__esModule', { value: true });
const mongoose_1 = require('mongoose');
const { dbUserName, dbPassword, dbName } = process.env;
const uri = `mongodb+srv://${dbUserName}:${dbPassword}@cluster0.mongodb.net/${dbName}?retryWrites=true&w=majority`;
function connectDB() {
  return __awaiter(this, void 0, void 0, function* () {
    const client = new mongoose_1.MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    try {
      yield client.connect();
      console.log('Connected to the database');
    } catch (error) {
      console.log('Error connecting to the database', error);
      client.close();
    }
  });
}
exports.default = connectDB;
