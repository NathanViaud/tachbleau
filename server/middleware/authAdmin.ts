import { verifyToken } from "~/server/utils/session"

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
    '/kanban',
    '/tasks',
    '/projects',
    '/api/users',
  ];
  

    const match = acceptedUrls.find(url => event.path.startsWith(url))

    if (match) {
      console.log('accepted url' + event.path)
      return
    }
    
    const token = getCookie(event, 'token')
  
    if (!token) {
        return { status: 401, body: 'Unauthorized user no token'}
      }
    
      const user = await verifyToken(token)
    
      if (!user) {
        return { status: 401, body: 'Unauthorized user no user'}
      }
    })
    