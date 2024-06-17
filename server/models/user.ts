import type { User } from "~/types/user.type"
import mongoose from "mongoose"
const users: User[] = [
  
const getUsers = (): User[] => {
  
}
const getUserByEmail = (email: string) => {
  return users.find(u => u.email === email)
}

const createUser = (user: User) => {
  users.push(user)
  return user
}

const updateUser = (user: User) => {
  const index = users.findIndex(u => u.email === user.email)
  users[index] = user
  return user
}

const deleteUser = (email: string) => {
  const index = users.findIndex(u => u.email === email)
  users.splice(index, 1)
}

export { getUsers, getUserByEmail ,createUser, updateUser, deleteUser }
