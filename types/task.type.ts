export interface Task {
    _id: string;
    title: string;
    description?: string;
    duration: number;
    status: 'done' | 'doing' | 'todo' | 'backlog';
    priority: 'low' | 'medium' | 'high';
    deadline: string;
    start?: string;
}

export interface TaskForm extends Omit<Task, '_id'> {}