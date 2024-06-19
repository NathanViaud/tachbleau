import mongoose from 'mongoose';
import { ObjectId } from 'mongodb';
// @ts-ignore
import uniqueValidator from 'mongoose-unique-validator';

const notificationSchema = new mongoose.Schema({
    title: { type: String, required: true },
    message: { type: String, required: true },
    read: { type: Boolean, default: false },
    assignedTo: { type: ObjectId, ref: 'User', default: null }
});

notificationSchema.plugin(uniqueValidator);
export const Notification = mongoose.model('Notification', notificationSchema);