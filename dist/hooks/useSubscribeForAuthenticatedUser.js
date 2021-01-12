import { useContext, useEffect } from 'react';
import { subscribeForAuthenticatedUser } from '../firebase/authentication/subscribeForAuthenticatedUser';
import { createAuthenticationState } from '../types/AuthenticationState';
import { AuthenticationStateContext } from '../context/AuthenticationStateProvider';
export function useSubscribeForAuthenticatedUser() {
    var _a = useContext(AuthenticationStateContext), authenticationState = _a[0], setAuthenticationState = _a[1];
    useEffect(function () {
        var unsubscribe = subscribeForAuthenticatedUser(function (authState) {
            setAuthenticationState(createAuthenticationState(authState));
        });
        return function () {
            unsubscribe();
        };
    }, [setAuthenticationState]);
    return authenticationState;
}
//# sourceMappingURL=useSubscribeForAuthenticatedUser.js.map