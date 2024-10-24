/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/no-require-imports */
import express from 'express';
import { createUser, deleteUser, getUserById, getUserEmail, getUsers, updateUser } from './methodsBase';
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

export const getAllUsers = async (Request: express.Request, Response: express.Response) => {
  try {
    const Users = await getUsers()

    return Response.status(200).json(Users)
  } catch (error) {
    return Response.status(500).json(error)
  }
}

export const postCreateUser = async (Request: express.Request, Response: express.Response) => {
  try {
    const { name, email, senha } = Request.body;

    if (!name || !email || !senha) {
      return Response.status(400).json({ error: 'Informar todos os dados solicitados' })
    }

    const existEmail = await getUserEmail(email)

    if (existEmail) {
      return Response.status(400).json({ error: 'Email já cadastrado' })
    }

    const HashPass = await bcrypt.hash(senha, 10);

    const User = await createUser({
      name,
      email,
      password: HashPass
    })

    return Response.status(201).json(User)

  } catch (error) {
    return Response.status(500).json(error)
  }
}

export const postLogin = async (Request: express.Request, Response: express.Response) => {
  try {
    const { email, senha } = Request.body;

    const user = await getUserEmail(email);
    if (!user) {
      return Response.status(404).json({ error: "Usuario não localizado" })
    }

    const passValid = await bcrypt.compare(senha, user.password);
    if (!passValid) {
      return Response.status(400).json({ error: "Senha incorreta" })
    }

    const token = jwt.sign({ email }, process.env.JWT_SECRET as string, {
      expiresIn: process.env.JWT_EXPIRES_IN
    });

    return Response.status(200).json({ token })

  } catch (error) {
    return Response.status(500).json(error)
  }
}

export const putUser = async (Request: express.Request, Response: express.Response) => {
  try {
    const id = Request.params.id;
    const { name, email, senha } = Request.body;
    const existUser = await getUserById(id)

    if (!existUser) {
      Response.status(404).json({ error: "Usuario não localizado" })
    }

    if (senha) {
      var HashPass = await bcrypt.hash(senha, 10);
    }

    const User = await updateUser(id, {
      name,
      email,
      password: HashPass
    })

    return Response.status(201).json(User)

  } catch (error) {
    return Response.status(500).json(error)
  }
}

export const deleteUserById = async (Request: express.Request, Response: express.Response) => {
  try {
    const { id } = Request.body;

    const existUser = await getUserById(id);
    if (!existUser) {
      return Response.status(404).json({ error: "Usuario não encontrado" })
    }

    await deleteUser(id);

    return Response.status(204).json({ User: "Usuario deletado" })
  } catch (error) {
    return Response.status(500).json(error)
  }
}
