import type { User } from "~/types/user.type"

const users: User[] = [
  {
    email: "admin@gmail.com",
    password: "$2a$10$q9RCHgoDplabHe/iq5HkduFSe6/o3DLjmkW6b8j6AyLpPIvwqRpeq",
    role: "admin",
    name: "Admin",
    job: "Software Engineer",
    id: "1"
  },
  {
    email: "user@gmail.com",
    password: "$2a$10$3zU3itd/AiI8XBtx8W.HreBBtJdUlGP0GE0Os3/hbceXjYjmtj6HG",
    role: "user",
    name: "User",
    job: "Software Engineer",
    id: "2"
  }
]

const getUsers = (): User[] => {
  return users
}
const getUserByEmail = (email: string) => {
  return users.find(u => u.email === email)
}
export { getUsers, getUserByEmail }
