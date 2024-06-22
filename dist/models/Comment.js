"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Comment = void 0;
const mongoose_1 = require("mongoose");
const commentSchema = new mongoose_1.Schema({
    eventId: { type: String, require: true },
    contents: { type: mongoose_1.Schema.Types.DocumentArray, require: true }
});
exports.Comment = (0, mongoose_1.model)('Comments', commentSchema);
//# sourceMappingURL=Comment.js.map