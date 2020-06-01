import { MinimalUser } from './MinimalUser';
export interface UsersState<T extends MinimalUser> {
    values: Map<string, T>;
}
