/* eslint-disable @typescript-eslint/no-require-imports */
import express from 'express';
import { createUser, getUserEmail } from './methodsBase';
const bcrypt = require('bcryptjs');

export const postCreateUser = async (Request: express.Request , Response: express.Response)=>{
  try{
    const {name, email, senha} = Request.body;

    if(!name || !email || !senha){
      return Response.status(400).json({error: 'Informar todos os dados solicitados'})
    }

    const existEmail = await getUserEmail(email)

    if(existEmail){
      return Response.status(400).json({error: 'Email já cadastrado'})
    }

    const HashPass = await bcrypt.hash(senha, 10);

    const User = await createUser({
      name,
      email,
      password: HashPass
    })

    return Response.status(200).json(User)

  }catch(error){
    return Response.status(500).json(error)
  }
}