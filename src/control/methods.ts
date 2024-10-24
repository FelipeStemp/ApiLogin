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

export const postCreateUser = async (Request: express.Request, Response: express.Response): Promise<void> => {
  try {
    const { name, email, senha } = Request.body;

    if (!name || !email || !senha) {
      Response.status(400).json({ error: 'Informar todos os dados solicitados' })
      return 
    }

    const existEmail = await getUserEmail(email)

    if (existEmail) {
      Response.status(400).json({ error: 'Email já cadastrado' })
      return 
    }

    const HashPass = await bcrypt.hash(senha, 10);

    const User = await createUser({
      name,
      email,
      password: HashPass
    })

    Response.status(201).json(User)
    return 

  } catch (error) {
    Response.status(500).json(error)
    return 
  }
}

export const postLogin = async (Request: express.Request, Response: express.Response): Promise<void> =>  {
  try {
    const { email, senha } = Request.body;

    const user = await getUserEmail(email);
    if (!user) {
      Response.status(404).json({ error: "Usuario não localizado" })
      return 
    }

    const passValid = await bcrypt.compare(senha, user.password);
    if (!passValid) {
      Response.status(400).json({ error: "Senha incorreta" })
      return 
    }
    
     /* const token = jwt.sign({ email }, process.env.JWT_SECRET as string, {
      expiresIn: process.env.JWT_EXPIRES_IN
    });  */

    Response.status(200).json(user)
    return 

  } catch (error) {
    Response.status(500).json(error)
    return 
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
