"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUser = void 0;
function isRequestWithUser(req) {
    return req.user !== undefined;
}
const getUser = (req) => {
    if (!isRequestWithUser(req)) {
        throw new Error('User not found');
    }
    const user = req.user;
    return user;
};
exports.getUser = getUser;
<<<<<<< HEAD
=======
//# sourceMappingURL=help.js.map
>>>>>>> 9c0ef4d91614811860ae2341df7b19239d8f626e
