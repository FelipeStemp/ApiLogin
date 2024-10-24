"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-require-imports */
const cors_1 = __importDefault(require("cors")); // Importando o cors
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const routes_1 = __importDefault(require("./routes/routes"));
require("dotenv").config();
const MONGO_URL = process.env.MONGO_URL;
mongoose_1.default.connect(MONGO_URL);
const app = (0, express_1.default)();
// Configurando o CORS
app.use((0, cors_1.default)({
    origin: '*', // Permite requisições apenas do seu frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
    allowedHeaders: ['Content-Type'], // Cabeçalhos permitidos
}));
app.use(express_1.default.json());
app.use('/', routes_1.default);
app.listen(3030, () => {
    console.log("Server running on http://localhost:3030/");
});
