'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.User = exports.UserRole = void 0;
const mongoose_1 = require('mongoose');
var UserRole;
(function (UserRole) {
  UserRole['PLAYER'] = 'player';
  UserRole['STORE'] = 'store';
})(UserRole || (exports.UserRole = UserRole = {}));
const userSchema = new mongoose_1.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: Object.values(UserRole),
    required: true,
  },
  emailCode: {
    type: String,
    default: '',
  },
  createAt: {
    type: Date,
    default: Date.now,
    select: false,
  },
  updateAt: {
    type: Date,
    default: Date.now,
    select: false,
  },
});
// Add updatedAt field before saving
userSchema.pre('save', function (next) {
  this.updatedAt = new Date();
  next();
});
exports.User = (0, mongoose_1.model)('users', userSchema);
