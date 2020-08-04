import { atom } from 'recoil';
import { AuthenticationState } from '../firebase/types';

export const authenticationAtom = atom<AuthenticationState>({
    key: 'authenticationAtom',
    default: {
        firebaseUser: undefined,
        loading: true
    }
});
