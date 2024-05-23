import jwt from "jsonwebtoken"
import type { User } from "~/types/user.type"
const createToken = async (user: User) => {
  const config = useRuntimeConfig()
  return await jwt.sign(
    {
      id: user.id,
      email: user.email
    },
    config.tokenSecret,

    {
      expiresIn: "1h"
    }
  )
}
const verifyToken = async (token: string) => {
  try {
  const config = useRuntimeConfig()
  return await jwt.verify(token, config.tokenSecret)
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
