import { atom } from 'recoil';
import { MinimalUserData } from '../types/MinimalUser';
import { Document } from '@bma98/firebase-db-manager';

export const usersAtom = atom({
    key: 'usersAtom',
    default: new Map<string, Document<MinimalUserData, unknown>>()
});
