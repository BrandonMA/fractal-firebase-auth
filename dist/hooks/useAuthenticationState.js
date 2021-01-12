import { useContext } from 'react';
import { AuthenticationStateContext } from '../context';
export function useAuthenticationState() {
    var authenticationState = useContext(AuthenticationStateContext)[0];
    return authenticationState;
}
//# sourceMappingURL=useAuthenticationState.js.map