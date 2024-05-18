import type { Task, TaskForm } from '~/types';
import { createTask, getTasks, updateTask } from '~/services';

interface TasksState {
    tasks: Task[];
}

export const useTasks = defineStore('tasks', {
    state: (): TasksState => ({
        tasks: []
    }),
    
    getters: {
        doing: (state) => state.tasks.filter((task) => task.status === 'doing'),
        done: (state) => state.tasks.filter((task) => task.status === 'done'),
        todo: (state) => state.tasks.filter((task) => task.status === 'todo'),
        backlog: (state) => state.tasks.filter((task) => task.status === 'backlog')
    },
    
    actions: {
        async fetchTasks() {
            this.tasks = await getTasks();
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
    }
})