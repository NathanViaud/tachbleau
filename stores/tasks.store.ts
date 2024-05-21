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
    
    getters: {
        tasks: (state) => [...state.backlog, ...state.todo, ...state.doing, ...state.done]
    },
    
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
            const oldStatus: Task['status'] | undefined = this.tasks.find((task) => task._id === id)?.status;
            const updatedTask = await updateTask(task, id);
            
            const index = this[task.status].findIndex((task) => task._id === id);
            
            // Update the lists when updating task status from the form
            if (oldStatus && oldStatus !== updatedTask.status) {
                this[oldStatus].splice(index, 1);
                this[updatedTask.status].push(updatedTask);
            }
            
            this[updatedTask.status][index] = updatedTask;
        },
        
        async updateTaskStatus(id: string, status: Task['status']) {
            const index = this[status].findIndex((task) => task._id === id);
            const task = this[status][index];

            if (task) {
                 await updateTask({ ...task, status }, id);
                 task.status = status;
            }
        },
    }
})