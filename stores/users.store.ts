import type { SimpleUpdateUser, UpdateUser, UserWithoutPassword } from '~/types/user.type';
import {
    addUserToProject,
    deleteUser,
    getUsers,
    register,
    removeUserFromProject,
    simpleUpdateUser,
} from '~/services';
import { updateUser } from '~/services';

interface UsersState {
    users: UserWithoutPassword[];
}

export const useUsers = defineStore('users', {
    state: (): UsersState => ({
        users: [],
    }),
    
    actions: {
        async register(email: string, password: string, name: string, job: string, role: string) {
            const newUser = await register(email, password, name, job, role);
            if (!newUser) return;
            this.users.push(newUser);
        },
        
        async fetchUsers() {
            const users = await getUsers();
            if (!users) return;
            
            this.users = users;
        },
        
        async deleteUser(id: string) {
            const deletedUser = await deleteUser(id);
            if (!deletedUser) return;
            
            this.users = this.users.filter(user => user._id !== deletedUser._id);
        },
        
        async updateUser(id: string, user: UpdateUser) {
            const updatedUser = await updateUser(id, user);
            if (!updatedUser) return;
            
            this.users = this.users.map(user => user._id === updatedUser._id ? updatedUser : user);
        },
        
        async updateProfile(userUpdate: SimpleUpdateUser) {
            const user = useUser();
            const updatedUser = await simpleUpdateUser(userUpdate);
            if (!updatedUser) return;
            
            user.value = updatedUser;
            
            this.users = this.users.map(user => user._id === updatedUser._id ? updatedUser : user);
        },
        
        getUser(id: string) {
            return this.users.find(user => user._id === id);
        },
        
        async addToProject(userId: string, projectId: string) {
            const success = await addUserToProject(projectId, userId);
            if (!success) return;
            
            this.users.find((user) => user._id === userId)?.projects?.push(projectId)
        },
        
        async removeFromProject(userId: string, projectId: string) {
            const success = await removeUserFromProject(projectId, userId);
            if (!success) return;
            
            const user = this.users.find((user) => user._id === userId);
            
            if (!user) return;
            
            user.projects = user?.projects?.filter(project => project !== projectId);
        }
    }
})