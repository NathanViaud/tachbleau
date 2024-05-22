import { ChevronsUp, ChevronUp, Circle, CircleCheck, CircleDashed, Minus, Timer } from 'lucide-vue-next';

export const STATUS = ['backlog', 'todo', 'doing', 'done'] as const;
export const PRIORITY = ['low', 'medium', 'high'] as const;

export const STATUS_OBJ = [
    {
        value: 'backlog',
        label: 'Backlog',
        icon: CircleDashed
    },
    {
        value: 'todo',
        label: 'To Do',
        icon: Circle
    },
    {
        value: 'doing',
        label: 'Doing',
        icon: Timer
    },
    {
        value: 'done',
        label: 'Done',
        icon: CircleCheck
    }
] as const;

export const PRIORITY_OBJ = [
    {
        value: 'low',
        label: 'Low',
        icon: Minus
    },
    {
        value: 'medium',
        label: 'Medium',
        icon: ChevronUp
    },
    {
        value: 'high',
        label: 'High',
        icon: ChevronsUp
    }
] as const;

export interface Task {
    _id: string;
    title: string;
    description?: string;
    duration: number;
    status: typeof STATUS[number];
    priority: typeof PRIORITY[number];
    deadline: string;
    start?: string;
}

export interface TaskForm extends Omit<Task, '_id'> {}