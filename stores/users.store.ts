import type { UserWithoutPassword } from '~/types/user.type';
import { getUsers, login, postToken, register } from '~/services';

interface UsersState {
    users: UserWithoutPassword[];
    currentUser: UserWithoutPassword | null;
    token: string | null;
}

export const useUsers = defineStore('users', {
    state: (): UsersState => ({
        users: [],
        currentUser: null,
        token: null
    }),

    actions: {
        async login(email: string, password: string) {
            this.currentUser = await login(email, password);
            if (this.currentUser) {
                this.token = await postToken(this.currentUser);
            }
        },

        async register(email: string, password: string, name: string, job: string, role: string) {
            this.users.push(await register(email, password, name, job, role));
        },
        
        async fetchUsers() {
            this.users = await getUsers();
        },
        
        getUser(id: string) {
            return this.users.find(user => user._id === id);
        }
    }
})