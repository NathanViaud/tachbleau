import type { UserWithoutPassword } from '~/types/user.type';

export const useAuthUser = () => {
    return useState<UserWithoutPassword | null>('user', () => null)
}
