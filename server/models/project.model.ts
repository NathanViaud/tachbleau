import mongoose from 'mongoose';
import { ObjectId } from 'mongodb';
import uniqueValidator from 'mongoose-unique-validator';

const projectSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    tasks: { type: [ObjectId], ref: 'Task', required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true }
});

projectSchema.plugin(uniqueValidator);
export const Project = mongoose.model('Project', projectSchema);
