import type { User, UserInput } from "~/types/user.type"

export const useAuth = () => {
    const authUser = useAuthUser()
    const userAdmin = useState<boolean>('userAdmin', () => false)
    const setUser = (user: User) => {
        authUser.value = user
    }
    const login = async (user: UserInput) => {
        try {
            const data: any = await $fetch('/api/user', {
                method: 'POST',
                body: user
            })
            console.log(data)
            userAdmin.value = data.isAdmin;
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
