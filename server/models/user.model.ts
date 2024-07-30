import mongoose from 'mongoose';
// @ts-ignore
import uniqueValidator from 'mongoose-unique-validator';

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: false },
    role: { type: String, required: false },
    job: { type: String, required: false },
    projects: { type: Array, required: false },
});

userSchema.plugin(uniqueValidator);
export const User = mongoose.model('User', userSchema);
