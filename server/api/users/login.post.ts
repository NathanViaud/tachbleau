
import mongoose from "mongoose"
import { User } from "../../models/user.model"
import { loginSchema } from "~/schema";
import { verifyPassword } from '../../utils/password';

export default defineEventHandler(async (event) => {
  try {
    const body = await readValidatedBody(event, body => loginSchema.safeParse(body));
    if (!body.success) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Invalid body'
      });
    }
    const { email, password } = body.data; 
    const user = await User.findOne({ email });
    
    const validCredentials = user ? await verifyPassword(password, user.password) : false
    
    if (!validCredentials) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Invalid email or password'
      });
    }
    return { user };
  } catch(e) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to login user.' + e
    });
  }
}
);

