import jwt from "jsonwebtoken"
import type { User, UserWithoutPassword } from "~/types/user.type"
const createToken = async (user: UserWithoutPassword) => {
  const config = useRuntimeConfig()
  return jwt.sign(
      {
        id: user._id,
        email: user.email
      },
      config.tokenSecret,
      
      {
        expiresIn: "1h"
      }
  );
}
const verifyToken = async (token: string) => {
  try {
  const config = useRuntimeConfig()
  return jwt.verify(token, config.tokenSecret)
  } catch (err) {
    return "Token expired"
  }
}

const getUserToken = (event:any) => {
  const cookie = getCookie(event, "__session")
  if (!cookie) {
    return null
  }
  const token = verifyToken(cookie)
  if (!token) {
    return null 
  }
  return token
}
export { createToken, getUserToken }
