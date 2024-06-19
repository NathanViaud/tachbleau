import mongoose from 'mongoose';
import { ObjectId } from 'mongodb';
// @ts-ignore
import uniqueValidator from 'mongoose-unique-validator';

const projectSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    startDate: { type: String, required: true },
    endDate: { type: String, required: true }
});

projectSchema.plugin(uniqueValidator);
export const Project = mongoose.model('Project', projectSchema);
