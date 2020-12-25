import { useRecoilValue } from 'recoil';
import { authenticationAtom } from '../atoms';
import { AuthenticationState } from '../types';

export function useAuthenticationState(): AuthenticationState {
    return useRecoilValue(authenticationAtom);
}
