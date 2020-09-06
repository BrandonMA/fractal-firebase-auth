import { AuthenticationState, MinimalUserData, MinimalExpectedDatabase } from '../types';
export declare function useSubscribeForDatabaseUserObject<T extends MinimalUserData, S>(authenticationState: AuthenticationState, database: MinimalExpectedDatabase<T, S>): boolean;
