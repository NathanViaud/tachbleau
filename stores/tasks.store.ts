import type { Filter, Task, TaskForm } from '~/types';
import { createTask, getTasks, updateTask, deleteTask } from '~/services';

interface TasksState {
    backlog: Task[];
    todo: Task[];
    doing: Task[];
    done: Task[];
    filters: Filter;
    loading: boolean;
}

export const useTasks = defineStore('tasks', {
    state: (): TasksState => ({
        // These list are managed by vue draggable
        backlog: [],
        todo: [],
        doing: [],
        done: [],
        filters: {
            search: '',
            status: new Set(),
            priority: new Set(),
            assignee: new Set(),
            project: new Set()
        },
        loading: false
    }),
    
    getters: {
        tasks: (state) => [...state.backlog, ...state.todo, ...state.doing, ...state.done],
        
        isFiltersDefault: (state) => {
            if (state.filters.search) return false;
            if (state.filters.status.size) return false;
            if (state.filters.priority.size) return false;
            if (state.filters.assignee.size) return false;
            return !state.filters.project.size;
        },
    },
    
    actions: {
        async fetchTasks() {
            this.loading = true;
            
            const tasks = await getTasks();
            
            if (!tasks || !tasks.length) return;
            
            this.backlog = tasks.filter((task) => task.status === 'backlog');
            this.todo = tasks.filter((task) => task.status === 'todo');
            this.doing = tasks.filter((task) => task.status === 'doing');
            this.done = tasks.filter((task) => task.status === 'done');
            
            this.loading = false;
        },
        
        async addTask(task: TaskForm) {
            this.loading = true;
            
            const newTask = await createTask(task);
            if (!newTask) return;
            
            this[newTask.status].push(newTask);
            
            this.loading = false;
        },
        
        async updateTask(task: TaskForm, id: string) {
            const oldStatus: Task['status'] | undefined = this.tasks.find((task) => task._id === id)?.status;
            const updatedTask = await updateTask(task, id);
            if (!updatedTask) return;
            
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
        
        resetFilters() {
            this.filters.search = '';
            this.filters.status.clear();
            this.filters.priority.clear();
            this.filters.assignee.clear();
            this.filters.project.clear();
        },
        
        passesFilters(task: Task, filterProjectId?: string) {
            if (this.filters.search && !task.title.toLowerCase().includes(this.filters.search.toLowerCase())) {
                return false;
            }
            
            if (this.filters.status.size && !this.filters.status.has(task.status)) {
                return false;
            }
            
            if (this.filters.priority.size && !this.filters.priority.has(task.priority)) {
                return false;
            }
            
            if (this.filters.project.size && (!task.project || !this.filters.project.has(task.project))) {
                return false;
            }
            
            if (filterProjectId && task.project !== filterProjectId) {
                return false;
            }
            
            if (this.filters.assignee.size && (!task.assignedTo || !this.filters.assignee.has(task.assignedTo))) {
                return false;
            }
            
            return true;
        },
        
        async deleteTask(id: string) {
            const deletedTask = await deleteTask(id);
            if (!deletedTask) return;

            if (deletedTask.status === 'backlog') {
                this.backlog = this.backlog.filter(task => task._id !== deletedTask._id);
            } else if (deletedTask.status === 'todo') {
                this.todo = this.todo.filter(task => task._id !== deletedTask._id);
            } else if (deletedTask.status === 'doing') {
                this.doing = this.doing.filter(task => task._id !== deletedTask._id);
            } else if (deletedTask.status === 'done') {
                this.done = this.done.filter(task => task._id !== deletedTask._id);
            }
        },
        
        reset() {
            this.resetFilters();
            this.backlog = [];
            this.todo = [];
            this.doing = [];
            this.done = [];
        }
    }
})