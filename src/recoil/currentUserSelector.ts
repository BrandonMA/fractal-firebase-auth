import { selector } from 'recoil';
import { usersAtom } from './usersAtom';
import { authenticationAtom } from './authenticationAtom';

export const currentUserSelector = selector({
    key: 'currentUserSelector',
    get: ({ get }) => {
        const auth = get(authenticationAtom);
        const users = get(usersAtom);
        if (auth.firebaseUser != null) {
            return users.get(auth.firebaseUser.uid);
        }
        return null;
    }
});
