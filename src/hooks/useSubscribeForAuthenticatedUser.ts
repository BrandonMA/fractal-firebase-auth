import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { subscribeForAuthenticatedUser } from '../firebase/authentication/subscribeForAuthenticatedUser';
import { authenticationAtom } from '../atoms/authenticationAtom';
import { AuthenticationState } from '../types/AuthenticationState';

export function useSubscribeForAuthenticatedUser(): AuthenticationState {
    const [authenticationState, setAuthenticationState] = useRecoilState(authenticationAtom);

    useEffect(() => {
        const unsubscribe = subscribeForAuthenticatedUser((authState) => {
            setAuthenticationState(authState);
        });
        return (): void => {
            unsubscribe();
        };
    }, [setAuthenticationState]);

    return authenticationState;
}
