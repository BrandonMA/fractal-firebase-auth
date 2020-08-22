import { MinimalUserData } from '..';
import { Document } from '@bma98/firebase-db-manager';
export declare function useAuthenticatedUser(): Document<MinimalUserData, null> | undefined;
