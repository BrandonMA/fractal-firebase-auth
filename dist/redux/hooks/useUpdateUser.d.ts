import { UsersSlice } from '../slices/createUsersSlice';
import { MinimalUserData } from '../types/MinimalUser';
import { MinimalExpectedDatabase } from '../types/MinimalExpectedDatabase';
export declare function useUpdateUser<T extends MinimalUserData, S>(database: MinimalExpectedDatabase<T, S>, usersSlice: UsersSlice): (data: T) => Promise<void>;
