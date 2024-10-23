/* eslint-disable @typescript-eslint/no-explicit-any */
import { User } from "../model/user";

export const getUsers = () => User.find({})

export const getUserEmail = async (email: string) => {
  if(email){
    return await User.findOne({email}).exec();
  }
  return null;
}

export const createUser = (values: Record<string, any>) => 
  new User(values)
.save()
.then((user: any) => user.toObject())

export const updateUser = async (id: string, values: Record<string, any>) => {
  return User.findOneByIdAndUpdate(id, values, {new: true})
}

export const deleteUser = async (id: string) =>{
  return User.findOneByIdAndDelete(id).exec();
}