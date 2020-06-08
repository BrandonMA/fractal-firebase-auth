import { UsersSlice } from '../slices/createUsersSlice';
import { MinimalUserData } from '../types/MinimalUser';
import { MinimalExpectedDatabase } from '../types/MinimalExpectedDatabase';
export declare function useCreateUser<T extends MinimalUserData, S>(database: MinimalExpectedDatabase<T, S>, data: T, usersSlice: UsersSlice): () => Promise<void>;
