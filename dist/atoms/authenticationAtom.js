import { atom } from 'recoil';
import { createAuthenticationState } from '../types';
export var authenticationAtom = atom({
    key: 'authenticationAtom',
    "default": createAuthenticationState(),
    dangerouslyAllowMutability: true // Objects that are already working with deep freeze, crash without this.
});
//# sourceMappingURL=authenticationAtom.js.map