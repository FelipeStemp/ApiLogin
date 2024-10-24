/* eslint-disable @typescript-eslint/no-require-imports */
const mongoose = require("mongoose");

// Define the User interface
export interface IUser {
  name: string;
  email: string;
  password: string;
}

// Create the user schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email:{
    type: String,
    required: true
  },
  password:{
    type: String,
    required: true
  }
})

export const User = mongoose.model('User', userSchema)
