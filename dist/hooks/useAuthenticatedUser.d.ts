import { MinimalUserData } from '..';
import { Document } from '@bma98/firebase-db-manager';
export declare function useAuthenticatedUser<T extends MinimalUserData, S>(): Document<T, S> | undefined;
