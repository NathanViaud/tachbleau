import type { UserWithoutPassword } from '~/types/user.type';

export const useUser = () => {
    return useState<UserWithoutPassword | null>('user', () => null);
}