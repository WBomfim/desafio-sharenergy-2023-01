"use strict";
exports.__esModule = true;
exports.UserSchema = void 0;
var zod_1 = require("zod");
var UserSchema = zod_1.z.object({
    userName: zod_1.z.string({ required_error: 'Username is required' })
        .min(3, { message: 'Username must be at least 3 characters' }),
    password: zod_1.z.string({ required_error: 'Password is required' })
        .min(8, { message: 'Password must be at least 8 characters' })
});
exports.UserSchema = UserSchema;
