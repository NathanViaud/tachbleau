export interface Project {
    _id: string;
    title: string;
    description: string;
    startDate: string;
    endDate: string;
}

export interface ProjectForm extends Omit<Project, '_id'> {}