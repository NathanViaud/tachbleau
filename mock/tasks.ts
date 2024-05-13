import type { Task } from '~/types';

export const tasks: Task[] = [
    {
        title: 'Task 1',
        description: 'Description 1',
        status: 'todo',
        priority: 'low',
        duration: 60,
        deadline: '2021-12-31',
        start: '2021-12-01'
    },
    {
        title: 'Task 2',
        description: 'Description 2',
        status: 'doing',
        priority: 'medium',
        duration: 120,
        deadline: '2021-12-31',
        start: '2021-12-01'
    },
    {
        title: 'Task 3',
        description: 'Description 3',
        status: 'done',
        priority: 'high',
        duration: 180,
        deadline: '2021-12-31',
        start: '2021-12-01'
    },
    {
        title: 'Task 4',
        description: 'Description 4',
        status: 'todo',
        priority: 'low',
        duration: 240,
        deadline: '2021-12-31',
        start: '2021-12-01'
    },
    {
        title: 'Task 5',
        description: 'Description 5',
        status: 'doing',
        priority: 'medium',
        duration: 300,
        deadline: '2021-12-31',
        start: '2021-12-01'
    },
    {
        title: 'Task 6',
        description: 'Description 6',
        status: 'done',
        priority: 'high',
        duration: 360,
        deadline: '2021-12-31',
        start: '2021-12-01'
    },
    {
        title: 'Task 7',
        description: 'Description 7',
        status: 'backlog',
        priority: 'low',
        duration: 420,
        deadline: '2021-12-31',
        start: '2021-12-01'
    },
    {
        title: 'Task 8',
        description: 'Description 8',
        status: 'backlog',
        priority: 'medium',
        duration: 480,
        deadline: '2021-12-31',
        start: '2021-12-01'
    }
]