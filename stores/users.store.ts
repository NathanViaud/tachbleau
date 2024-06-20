import type { SimpleUpdateUser, UpdateUser, UserWithoutPassword } from '~/types/user.type';
import { deleteUser, getUsers, login, logout, postToken, register, simpleUpdateUser, verifyToken } from '~/services';
import { updateUser } from '~/services';

interface UsersState {
    users: UserWithoutPassword[];
    currentUser: UserWithoutPassword | null;
    loggingIn: boolean;
    error: 'invalid' | 'expired' | null;
}

export const useUsers = defineStore('users', {
    state: (): UsersState => ({
        users: [],
        currentUser: null,
        loggingIn: false,
        error: null
    }),
    
    getters: {
        isAdmin: (state) => {
            return state.currentUser && state.currentUser.role === 'admin'
        }
    },

    actions: {
        async login(email: string, password: string) {
            this.loggingIn = true;
            try {
                this.currentUser = await login(email, password);
                if (this.currentUser) {
                    await postToken(this.currentUser);
                }
                this.error = null;
            } catch {
                this.currentUser = null;
                this.error = 'invalid';
            }
            this.loggingIn = false;
        },

        async register(email: string, password: string, name: string, job: string, role: string) {
            this.users.push(await register(email, password, name, job, role));
        },
        
        async logout() {
            await logout();
            
            this.currentUser = null;
            
            const router = useRouter();
            await router.push('/auth/login');
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
        
        async updateUser(id: string, user: UpdateUser) {
            const updatedUser = await updateUser(id, user);
            
            this.users = this.users.map(user => user._id === updatedUser._id ? updatedUser : user);
        },
        
        async updateProfile(user: SimpleUpdateUser) {
            const updatedUser = await simpleUpdateUser(user);
            
            this.currentUser = updatedUser;
            this.users = this.users.map(user => user._id === updatedUser._id ? updatedUser : user);
        },
        
        getUser(id: string) {
            return this.users.find(user => user._id === id);
        }
    }
})