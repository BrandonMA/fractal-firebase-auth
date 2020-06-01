import { MinimalUser } from './MinimalUser';

export interface UsersState<T extends MinimalUser> {
    [key: string]: T;
}
