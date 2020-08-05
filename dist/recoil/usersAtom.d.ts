import { MinimalUserData } from '../firebase/types/MinimalUser';
import { Document } from 'firebase-db-manager';
export declare const usersAtom: import("recoil").RecoilState<Map<string, Document<MinimalUserData, any>>>;
