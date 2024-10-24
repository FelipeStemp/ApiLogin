"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const methods_1 = require("../control/methods");
const routes = express_1.default.Router();
routes.post('/createLogin', methods_1.postCreateUser);
routes.post('/login', methods_1.postLogin);
exports.default = routes;
