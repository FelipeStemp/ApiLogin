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
exports.deleteUserById = exports.putUser = exports.postLogin = exports.postCreateUser = exports.getAllUsers = void 0;
const methodsBase_1 = require("./methodsBase");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const getAllUsers = (Request, Response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Users = yield (0, methodsBase_1.getUsers)();
        return Response.status(200).json(Users);
    }
    catch (error) {
        return Response.status(500).json(error);
    }
});
exports.getAllUsers = getAllUsers;
const postCreateUser = (Request, Response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, senha } = Request.body;
        if (!name || !email || !senha) {
            Response.status(400).json({ error: 'Informar todos os dados solicitados' });
            return;
        }
        const existEmail = yield (0, methodsBase_1.getUserEmail)(email);
        if (existEmail) {
            Response.status(400).json({ error: 'Email já cadastrado' });
            return;
        }
        const HashPass = yield bcrypt.hash(senha, 10);
        const User = yield (0, methodsBase_1.createUser)({
            name,
            email,
            password: HashPass
        });
        Response.status(201).json(User);
        return;
    }
    catch (error) {
        Response.status(500).json(error);
        return;
    }
});
exports.postCreateUser = postCreateUser;
const postLogin = (Request, Response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, senha } = Request.body;
        const user = yield (0, methodsBase_1.getUserEmail)(email);
        if (!user) {
            Response.status(404).json({ error: "Usuario não localizado" });
            return;
        }
        const passValid = yield bcrypt.compare(senha, user.password);
        if (!passValid) {
            Response.status(400).json({ error: "Senha incorreta" });
            return;
        }
        const token = jwt.sign({ email }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN
        });
        Response.status(200).json({ token });
        return;
    }
    catch (error) {
        Response.status(500).json(error);
        return;
    }
});
exports.postLogin = postLogin;
const putUser = (Request, Response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = Request.params.id;
        const { name, email, senha } = Request.body;
        const existUser = yield (0, methodsBase_1.getUserById)(id);
        if (!existUser) {
            Response.status(404).json({ error: "Usuario não localizado" });
        }
        if (senha) {
            var HashPass = yield bcrypt.hash(senha, 10);
        }
        const User = yield (0, methodsBase_1.updateUser)(id, {
            name,
            email,
            password: HashPass
        });
        return Response.status(201).json(User);
    }
    catch (error) {
        return Response.status(500).json(error);
    }
});
exports.putUser = putUser;
const deleteUserById = (Request, Response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = Request.body;
        const existUser = yield (0, methodsBase_1.getUserById)(id);
        if (!existUser) {
            return Response.status(404).json({ error: "Usuario não encontrado" });
        }
        yield (0, methodsBase_1.deleteUser)(id);
        return Response.status(204).json({ User: "Usuario deletado" });
    }
    catch (error) {
        return Response.status(500).json(error);
    }
});
exports.deleteUserById = deleteUserById;
