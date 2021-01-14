import { MinimalExpectedDatabase } from '../../types/MinimalExpectedDatabase';
import { MinimalUserData } from '../../types';
import { Document } from '@bma98/firebase-db-manager';
export declare function createUserDocument<T extends MinimalUserData, S>(database: MinimalExpectedDatabase<T, S>, data: T): Promise<Document<T, S>>;
