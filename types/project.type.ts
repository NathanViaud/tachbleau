export interface Project {
    _id: string;
    title: string;
    description: string;
    tasks: string[];
    startDate: string;
    endDate: string;
}

export interface ProjectForm extends Omit<Project, '_id'> {}