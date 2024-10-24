"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.createUser = exports.getUserEmail = exports.getUserById = exports.getUsers = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const user_1 = require("../model/user");
const getUsers = () => user_1.User.find({});
exports.getUsers = getUsers;
const getUserById = (id) => user_1.User.findOneById(id);
exports.getUserById = getUserById;
const getUserEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    if (email) {
        return yield user_1.User.findOne({ email }).exec();
    }
    return null;
});
exports.getUserEmail = getUserEmail;
const createUser = (values) => new user_1.User(values)
    .save()
    .then((user) => user.toObject());
exports.createUser = createUser;
const updateUser = (id, values) => __awaiter(void 0, void 0, void 0, function* () {
    return user_1.User.findOneByIdAndUpdate(id, values, { new: true });
});
exports.updateUser = updateUser;
const deleteUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return user_1.User.findOneByIdAndDelete(id).exec();
});
exports.deleteUser = deleteUser;
