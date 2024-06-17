
import mongoose from "mongoose"
import { User } from "../../models/user.model"
import { loginSchema } from "~/schema";
export default defineEventHandler(async (event) => {
  try {
    const body = await readValidatedBody(event, body => loginSchema.safeParse(body));
    if (!body.success) {
      console.log( "body"+ body.error);
      throw createError({
        statusCode: 400,
        statusMessage: 'Invalid body'
      });
    }
    const { email, password } = body.data; // Declare the 'email' variable
    const user = await User.findOne({ email, password });
    if (!user) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Invalid email or password'
      });
    }
    console.log(user);
    return { user };
  } catch(e) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to login user.' + e
    });
  }
}
);

