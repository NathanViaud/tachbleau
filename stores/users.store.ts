import type { UserWithoutPassword } from '~/types/user.type';
import { deleteUser, getUsers, login, postToken, register, verifyToken } from '~/services';

interface UsersState {
    users: UserWithoutPassword[];
    currentUser: UserWithoutPassword | null;
}

export const useUsers = defineStore('users', {
    state: (): UsersState => ({
        users: [],
        currentUser: null,
    }),

    actions: {
        async login(email: string, password: string) {
            this.currentUser = await login(email, password);
            if (this.currentUser) {
                await postToken(this.currentUser);
            }
        },

        async register(email: string, password: string, name: string, job: string, role: string) {
            this.users.push(await register(email, password, name, job, role));
        },
        
        async logout() {
            this.currentUser = null;
            
            // getLogout
        },
        
        async fetchCurrentUser(token: string) {
            this.currentUser = await verifyToken(token);
        },
        
        async fetchUsers() {
            this.users = await getUsers();
        },
        
        async deleteUser(id: string) {
            const deletedUser = await deleteUser(id);
            
            this.users = this.users.filter(user => user._id !== deletedUser._id);
        },
        
        getUser(id: string) {
            return this.users.find(user => user._id === id);
        }
    }
})