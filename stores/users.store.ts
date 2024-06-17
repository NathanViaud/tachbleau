import type { UserWithoutPassword } from '~/types/user.type';
import { login, postToken, register } from '~/services';

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
            this.currentUser = await register(email, password, name, job, role);
            if (this.currentUser) {
                this.token = await postToken(this.currentUser);
            }
        }
    }
})