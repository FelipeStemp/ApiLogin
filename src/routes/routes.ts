import express from 'express';
import { postCreateUser, postLogin } from '../control/methods';

const routes = express.Router();

routes.post('/createLogin', postCreateUser);
routes.post('/login', postLogin)

export default routes;