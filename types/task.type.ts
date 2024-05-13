export interface Task {
    title: string;
    description: string;
    duration: number;
    status: 'done' | 'doing' | 'todo' | 'backlog';
    priority: 'low' | 'medium' | 'high';
    deadline: string;
    start?: string;
}