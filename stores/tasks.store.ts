import type { Task, TaskForm } from '~/types';
import { createTask, getTasks, updateTask } from '~/services';

interface TasksState {
    backlog: Task[];
    todo: Task[];
    doing: Task[];
    done: Task[];
}

export const useTasks = defineStore('tasks', {
    state: (): TasksState => ({
        // These list are managed by vue draggable
        backlog: [],
        todo: [],
        doing: [],
        done: []
    }),
    actions: {
        async fetchTasks() {
            const tasks = await getTasks();
            
            this.backlog = tasks.filter((task) => task.status === 'backlog');
            this.todo = tasks.filter((task) => task.status === 'todo');
            this.doing = tasks.filter((task) => task.status === 'doing');
            this.done = tasks.filter((task) => task.status === 'done');
        },
        
        async addTask(task: TaskForm) {
            const newTask = await createTask(task);
            
            this[newTask.status].push(newTask);
        },
        
        async updateTask(task: TaskForm, id: string) {
            const updatedTask = await updateTask(task, id);
            
            const index = this[task.status].findIndex((task) => task._id === id);
            this[updatedTask.status][index] = updatedTask;
        },
        
        async updateTaskStatus(id: string, status: Task['status']) {
            const task = this[status].find((task) => task._id === id);

            if (task) {
                await updateTask({ ...task, status }, id);
            }

        },
    }
})