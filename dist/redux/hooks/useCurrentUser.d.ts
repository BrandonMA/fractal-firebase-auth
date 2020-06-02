import { MinimalUser, MinimalUserData } from '../types/MinimalUser';
export declare function useCurrentUser<T extends MinimalUserData, S>(): MinimalUser<T, S> | null | undefined;
