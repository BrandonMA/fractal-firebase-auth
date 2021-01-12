import { MinimalUserData } from '..';
import { Document } from '@bma98/firebase-db-manager';
export declare function useFirebaseUser<T extends MinimalUserData, S>(): Document<T, S> | undefined;
