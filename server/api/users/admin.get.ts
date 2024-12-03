import bcrypt from "bcryptjs";
import { User } from "~/server/models/user.model";

export default defineEventHandler(async () => {
    const password = bcrypt.hash(process.env.ADMIN_PASSWORD!, 10);
    const user = new User({
        email: process.env.ADMIN_EMAIL!,
        password,
        name: "admin",
        job: "admin",
        role: "admin",
    });

    await user.save();
});
