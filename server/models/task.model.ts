import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const taskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true, default: '' },
    status: { type: String, required: true },
    start: { type: Date, required: true, default: null },
    deadline: { type: Date, required: true },
    duration: { type: Number, required: true },
    assignedTo: { type: ObjectId, ref: 'User', required: true },
    priority: { type: String, required: true }
});

taskSchema.plugin(uniqueValidator);
module.exports = mongoose.model('Task', taskSchema);