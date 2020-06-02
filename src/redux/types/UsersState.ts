import { MinimalUser, MinimalUserData } from './MinimalUser';

export interface UsersState<T extends MinimalUserData, S> {
    values: Map<string, MinimalUser<T, S>>;
}

export function isUsersState<T extends MinimalUserData, S>(value: unknown): value is UsersState<T, S> {
    const casted = value as UsersState<T, S>;
    return casted.values != null;
}
