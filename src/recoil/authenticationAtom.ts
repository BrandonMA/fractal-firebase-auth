import { atom } from 'recoil';
import { AuthenticationState, createAuthenticationState } from '../types';

export const authenticationAtom = atom<AuthenticationState>({
    key: 'authenticationAtom',
    default: createAuthenticationState(),
    dangerouslyAllowMutability: true
});
