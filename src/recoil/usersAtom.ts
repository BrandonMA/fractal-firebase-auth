import { atom } from 'recoil';

export const usersAtom = atom({
    key: 'usersAtom',
    default: new Map()
});
