import { MinimalUser } from './MinimalUser';
export interface UsersState<T extends MinimalUser> {
    users: Map<string, T>;
}
export declare function isUsersState<T extends MinimalUser>(value: unknown): value is UsersState<T>;
