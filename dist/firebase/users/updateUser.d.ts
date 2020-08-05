import { MinimalExpectedDatabase } from '../types/MinimalExpectedDatabase';
import { MinimalUserData } from '../types';
export declare function updateUser<T extends MinimalUserData, S>(database: MinimalExpectedDatabase<T, S>, data: T): Promise<unknown>;
