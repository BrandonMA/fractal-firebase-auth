import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { subscribeForAuthenticatedUser } from '../firebase/authentication/subscribeForAuthenticatedUser';
import { authenticationAtom } from '../atoms/authenticationAtom';
export function useSubscribeForAuthenticatedUser() {
    var _a = useRecoilState(authenticationAtom), authenticationState = _a[0], setAuthenticationState = _a[1];
    useEffect(function () {
        var unsubscribe = subscribeForAuthenticatedUser(function (authState) {
            setAuthenticationState(authState);
        });
        return function () {
            unsubscribe();
        };
    }, [setAuthenticationState]);
    return authenticationState;
}
//# sourceMappingURL=useSubscribeForAuthenticatedUser.js.map