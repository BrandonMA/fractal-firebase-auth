import { MinimalExpectedDatabase } from '../types/MinimalExpectedDatabase';
import { UsersSlice } from '../slices/createUsersSlice';
import { MinimalUserData } from '../types/MinimalUser';
export declare function useSubscribeForUser<T extends MinimalUserData, S>(database: MinimalExpectedDatabase<T, S>, id: string, usersSlice: UsersSlice, onFetchDone?: () => void): () => firebase.Unsubscribe;
