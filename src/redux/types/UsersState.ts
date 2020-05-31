import { MinimalUser } from './MinimalUser';

export interface UsersState<T extends MinimalUser> {
    users: Map<string, T>;
}

export function isUsersState<T extends MinimalUser>(value: unknown): value is UsersState<T> {
    const casted = value as UsersState<T>;
    return casted.users != null;
}
