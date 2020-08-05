/* eslint-disable @typescript-eslint/no-explicit-any */
import { atom } from 'recoil';
import { MinimalUserData } from '../firebase/types/MinimalUser';
import { Document } from 'firebase-db-manager';

export const usersAtom = atom({
    key: 'usersAtom',
    default: new Map<string, Document<MinimalUserData, any>>()
});
