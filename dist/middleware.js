"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyJwt = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyJwt = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        res.status(403).json({ error: "Token não fornecido" });
        return;
    }
    const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : authHeader;
    jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET, (error, decoded) => {
        if (error) {
            res.status(401).json({ error: "Token inválido" });
            return;
        }
        req.user = decoded;
        next();
    });
};
exports.verifyJwt = verifyJwt;
