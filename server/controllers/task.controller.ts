import { Task } from '@/server/models/task.model';

export async function getTasks(req, res, next) {
    try {
        const tasks = await Task.find();
        res.status(200).json(tasks);
    } catch (error) {
        next(error);
    }
}

export async function getTask(req, res, next) {
    try {
        const task = await Task.findById(req.params.id);
        res.status(200).json(task);
    } catch(error) {
        next(error);
    }
}

export async function createTask(req, res, next) {
    try {
        const task = new Task(req.body);
        await task.save();
        res.status(201).json(task);
    } catch(error) {
        next(error);
    }
}

export async function updateTask(req, res, next) {
    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(task);
    } catch(error) {
        next(error);
    }
}

export async function deleteTask(req, res, next) {
    try {
        await Task.findByIdAndDelete(req.params.id);
        res.status(204).end();
    } catch (error) {
        next(error);
    }
}