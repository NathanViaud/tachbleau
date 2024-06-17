import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';
// @ts-ignore
import uniqueValidator from 'mongoose-unique-validator';

const taskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    status: { type: String, default: 'backlog' },
    start: { type: Date, default: null },
    deadline: { type: String, required: true },
    duration: { type: Number, required: true },
    priority: { type: String, default: 'low' },
    assignedTo: { type: ObjectId, ref: 'User', default: null },
    project: { type: ObjectId, ref: 'Project' }
});

taskSchema.plugin(uniqueValidator);
export const Task = mongoose.model('Task', taskSchema);