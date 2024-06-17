import type { User, UserInput } from "~/types/user.type"
import axios from 'axios'
export const useAuth = () => {
    const authUser = useAuthUser()
    const userAdmin = useState<boolean>('userAdmin', () => false)
    const setUser = (user: User) => {
        authUser.value = user
    }
    const login = async (user: UserInput) => {
        console.log(user)
        try {
            const data: any = await axios.post('/api/user/login', {
                email: user.email,
                password: user.password
            })
            console.log(data)
            userAdmin.value = data.user.role === 'admin'
            setUser(data.user)
            return data
        } catch (err) {
            return null
        }
    }
    const userLoggedIn = async () => {
        if (!authUser.value) {
            const data: any = await $fetch('/api/user/token', {
                headers: useRequestHeaders(['cookie'])
            })
            setUser(data.user)
            return data
        }
    }
    const logout = async () => {
        const data: any = await $fetch('/api/user/logout')
        userAdmin.value = false
        setUser(data.user)
        return data
    }
    return {
        login,
        userLoggedIn,
        userAdmin,
        logout,
        authUser
    }
}
