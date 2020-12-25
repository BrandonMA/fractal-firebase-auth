import { atom } from 'recoil';
import { createAuthenticationState } from '../types';
export var authenticationAtom = atom({
    key: 'authenticationAtom',
    "default": createAuthenticationState(),
    dangerouslyAllowMutability: true // Seems like firebase objects do not work with this due to deep freeze.
});
//# sourceMappingURL=authenticationAtom.js.map