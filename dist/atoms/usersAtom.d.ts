import { MinimalUserData } from '../types/MinimalUser';
import { Document } from '@bma98/firebase-db-manager';
export declare const usersAtom: import("recoil").RecoilState<Map<string, Document<MinimalUserData, unknown>>>;
