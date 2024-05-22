import type { Task } from '~/types/task.type';

export interface Filter {
    search: string;
    status: Set<Task['status']>;
    priority: Set<Task['priority']>;
    assignee: Set<string>;
}