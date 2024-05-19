import type { Task, TaskForm } from '~/types';
import { createTask, getTasks, updateTask } from '~/services';

interface TasksState {
    tasks: Task[];
    backlog: Task[];
    todo: Task[];
    doing: Task[];
    done: Task[];
}

export const useTasks = defineStore('tasks', {
    state: (): TasksState => ({
        tasks: [],
        
        // These list are managed by vue draggable
        backlog: [],
        todo: [],
        doing: [],
        done: []
    }),
    actions: {
        async fetchTasks() {
            this.tasks = await getTasks();
            
            this.backlog = this.tasks.filter((task) => task.status === 'backlog');
            this.todo = this.tasks.filter((task) => task.status === 'todo');
            this.doing = this.tasks.filter((task) => task.status === 'doing');
            this.done = this.tasks.filter((task) => task.status === 'done');
        },
        
        async addTask(task: TaskForm) {
            const newTask = await createTask(task);
            
            this.tasks.push(newTask);
        },
        
        async updateTask(task: TaskForm, id: string) {
            const updatedTask = await updateTask(task, id);
            const index = this.tasks.findIndex((task) => task._id === id);
            
            this.tasks[index] = updatedTask;
        },
        
        async updateTaskStatus(id: string, status: Task['status']) {
            const task = this.tasks.find((task) => task._id === id);

            if (task) {
                await updateTask({ ...task, status }, id);
            }

        },
    }
})