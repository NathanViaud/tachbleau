import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';
// @ts-ignore
import uniqueValidator from 'mongoose-unique-validator';

const taskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, default: '' },
    status: { type: String, default: 'backlog' },
    start: { type: Date, default: null },
    deadline: { type: String, required: true },
    duration: { type: Number, required: true },
    assignedTo: { type: ObjectId, ref: 'User', default: null },
    priority: { type: String, required: true }
});

taskSchema.plugin(uniqueValidator);
export const Task = mongoose.model('Task', taskSchema);