import { useRecoilValue } from 'recoil';
import { authenticationAtom } from '../atoms';
export function useAuthenticationState() {
    return useRecoilValue(authenticationAtom);
}
//# sourceMappingURL=useAuthenticationState.js.map