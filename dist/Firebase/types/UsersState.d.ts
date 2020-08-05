import { MinimalUser, MinimalUserData } from './MinimalUser';
export interface UsersState<T extends MinimalUserData, S> {
    values: Map<string, MinimalUser<T, S>>;
}
export declare function isUsersState<T extends MinimalUserData, S>(value: unknown): value is UsersState<T, S>;
