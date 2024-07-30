import type { JwtPayload } from 'jsonwebtoken';
import { User } from '~/server/models/user.model';

export default defineEventHandler(async (event) => {

   const token = getCookie(event, 'token');
   
   if (!token) {
       event.context.user = null;
       return;
   }
   
   const verifiedToken = await verifyToken(token) as JwtPayload;
   if (!verifiedToken) {
       event.context.user = null;
       return;
   }
   
   event.context.user = await User.findById(verifiedToken.id).select('-password');
})