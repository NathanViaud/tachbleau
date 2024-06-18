import { verifyToken } from "~/services"

export default defineEventHandler(async (event) => {

  const acceptedUrls = [
    '/api/users/login', 
    '/api/users/logout', 
    '/api/projects', 
    '/api/tasks', 
    '/api/users/token', 
    '/auth/login', 
    '/auth/logout', 
    '/api/users/token/verify',
    '/'
  ]

  if (acceptedUrls.includes(event.path)) {
    console.log('accepted url' + event.path)
    return
  }
  
  const token = getCookie(event, 'token')

  if (!token) {
    return { status: 401, body: 'Unauthorized admin no token'}
  }

  const user = await verifyToken(token)

  if (!user) {
    return { status: 401, body: 'Unauthorized admin no user' }
  }

  if (user.role !== 'admin') {
    return { status: 403, body: 'Forbidden' }
  }

})
