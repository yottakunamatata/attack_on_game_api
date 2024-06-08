"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleValidationErrors = void 0;
const express_validator_1 = require("express-validator");
<<<<<<< HEAD
const handleValidationErrors = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ message: errors.array().map((x) => x.msg) });
=======
const CustomResponseType_1 = require("@/enums/CustomResponseType");
const handleValidationErrors = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        res.status(400).json({
            status: CustomResponseType_1.CustomResponseType.VALIDATION_ERROR,
            message: errors.array().map((x) => x.msg),
        });
>>>>>>> 9c0ef4d91614811860ae2341df7b19239d8f626e
        return;
    }
    next();
};
exports.handleValidationErrors = handleValidationErrors;
<<<<<<< HEAD
=======
//# sourceMappingURL=handleValidationErrors.js.map
>>>>>>> 9c0ef4d91614811860ae2341df7b19239d8f626e
