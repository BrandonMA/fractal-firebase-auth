import { useRecoilValue } from 'recoil';
import { usersAtom } from '../atoms/usersAtom';
import { useAuthenticationState } from './useAuthenticationState';
export function useAuthenticatedUser() {
    var users = useRecoilValue(usersAtom);
    var auth = useAuthenticationState();
    if (auth.firebaseUser != null && users.has(auth.firebaseUser.uid)) {
        return users.get(auth.firebaseUser.uid);
    }
    return undefined;
}
//# sourceMappingURL=useAuthenticatedUser.js.map